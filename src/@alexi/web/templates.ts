import { existsSync } from '@std/fs';
import nunjucks from 'npm:nunjucks';
import { managers } from '@alexi/apps/registry';

export default class TemplateBackend {
  templatesDirname = 'templates';

  async getTemplate(templateName: string): Promise<any> {
    const root = Deno.cwd();
    const [templateDirName, fileName] = templateName.split('/');

    for (const managerName in managers) {
      const [name, extension] = fileName.split('.');
      const importPath =
        `${root}/src/${managerName}/${this.templatesDirname}/${templateDirName}/${name}.${extension}`;

      if (!existsSync(importPath)) {
        continue;
      }

      return async (context) => {
        switch (extension) {
          // deno-lint-ignore no-case-declarations
          case 'html':
            const template = await Deno.readTextFile(importPath);
            return nunjucks.renderString(template, context);
          case 'ts':
            return await import(importPath);
          case 'js':
            return await import(importPath);

          default:
            throw new Error('Unsupported template extension.');
        }
      };
    }
  }
}

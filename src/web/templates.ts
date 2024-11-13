import { existsSync } from '@std/fs';
import nunjucks from 'npm:nunjucks';
import { apps } from '@alexi/web/registry';

export default class TemplateBackend {
  templatesDirname = 'templates';

  async getTemplate(templateName: string): Promise<any> {
    const root = Deno.cwd();
    const [templateDirName, fileName] = templateName.split('/');

    for (const appName in apps) {
      const [name, extension] = fileName.split('.');
      const importPath =
        `${root}/src/${appName}/${this.templatesDirname}/${templateDirName}/${name}.${extension}`;

      if (!existsSync(importPath)) {
        continue;
      }

      return async (context) => {
        switch (extension) {
          // deno-lint-ignore no-case-declarations
          case 'html':
            const template = await Deno.readTextFile(importPath);
            return nunjucks.renderString(template, context);

          default:
            throw new Error('Unsupported template extension.');
        }
      };
    }
  }
}

import { bundle } from 'jsr:@deno/emit';
import { managers } from '@alexi/apps/registry';

const STATIC_ROOT = './static';
const SRC_ROOT = 'src';
const STATICFILES_DIRS = ['./project/static', './src/myapp/static'];
const dev = Deno.env.get('MODE') === 'development';
const clients = new Set<WebSocket>();
let collecting = false;

export async function runserver() {
  const options = { port: 3000, hostname: 'localhost' };
  console.info(
    `Starting server at http://${options.hostname}:${options.port}/`,
  );

  if (dev) {
    await collectstatic();
  }

  Deno.serve(
    options,
    async (request: Request) => {
      const requestURL = new URL(request.url);
      const pathname = requestURL.pathname;

      if (dev) {
        // Handle WebSocket connections for HMR
        if (pathname === '/hmr') {
          const { response, socket } = Deno.upgradeWebSocket(request);
          socket.onopen = () => clients.add(socket);
          socket.onclose = () => clients.delete(socket);
          return response;
        }
      }

      // Serve static ts files
      if (pathname.startsWith('/static/')) {
        const filePath = `${pathname.replace('/static/', './static/')}`;

        if (filePath.endsWith('.ts')) {
          const code = await Deno.readTextFile(filePath);
          return new Response(code, {
            headers: { 'Content-Type': 'application/javascript' },
          });
        }
      }

      for (const appName in managers) {
        const app = managers[appName];
        const urlpatterns = app.urls?.urlpatterns ?? [];

        for (const pattern of urlpatterns) {
          const url = pathname.startsWith('/') ? pathname.slice(1) : pathname;
          const regexPath = pattern.path.replace(/:\w+/g, '([^/]+)');
          const regex = new RegExp(`^${regexPath}/?$`);
          const match = url.match(regex);

          if (match) {
            return await pattern.view.dispatch(request);
          }
        }
      }

      return new Response('404: Not Found', { status: 404 });
    },
  );
  console.info('Quit the server with CONTROL-C.');

  if (dev) {
    // Watch for file changes and notify clients
    const watcher = Deno.watchFs(SRC_ROOT);
    for await (const event of watcher) {
      if (event.kind === 'modify') {
        if (!collecting) {
          collecting = true;
          for (let srcPath of event.paths) {
            srcPath = srcPath.split(SRC_ROOT)[1];
            srcPath = SRC_ROOT + srcPath;
            const destPath = `${STATIC_ROOT}/${srcPath.split('static')[1]}`;
            const destDir = destPath.split('/').slice(0, -1).join('/');
            await transpileFile(srcPath, destPath, destDir);
          }

          // Prevent duplicate reloads
          setTimeout(() => {
            collecting = false;

            for (const client of clients) {
              client.send('reload');
            }
          }, 0);
        }
      }
    }
  }
}

async function transpileFile(
  srcPath: string,
  destPath: string,
  destDir: string,
) {
  if (srcPath.endsWith('.ts')) {
    const result = await bundle(
      srcPath,
      {
        importMap: './deno.json',
        minify: true,
      },
    );
    const code = result.code;
    await Deno.mkdir(destDir, { recursive: true });
    await Deno.writeTextFile(destPath, code, { create: true });
  }
}

async function transpileRecursively(srcDir: string, destDir: string) {
  for await (const entry of Deno.readDir(srcDir)) {
    const srcPath = `${srcDir}/${entry.name}`;
    const destPath = `${destDir}/${entry.name}`;

    if (entry.isFile) {
      await transpileFile(srcPath, destPath, destDir);
    } else if (entry.isDirectory) {
      await transpileRecursively(srcPath, destPath);
    }
  }
}

export async function collectstatic() {
  console.info('Collecting static files...');
  collecting = true;

  for (const dir of STATICFILES_DIRS) {
    await transpileRecursively(dir, STATIC_ROOT);
  }

  collecting = false;
  console.info('Done.');
}

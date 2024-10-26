import { managers } from '@alexi/apps/registry';
import { bundle } from 'jsr:@deno/emit';

const clients = new Set<WebSocket>();

export async function run() {
  const options = { port: 3000, hostname: 'localhost' };
  console.info(
    `Starting server at http://${options.hostname}:${options.port}/`,
  );

  Deno.serve(
    options,
    async (request: Request) => {
      const requestURL = new URL(request.url);
      const pathname = requestURL.pathname;

      // Handle WebSocket connections for HMR
      if (pathname === '/hmr') {
        const { response, socket } = Deno.upgradeWebSocket(request);
        socket.onopen = () => clients.add(socket);
        socket.onclose = () => clients.delete(socket);
        return response;
      }

      // Serve static ts files
      if (pathname.startsWith('/static/')) {
        // const filePath = `.${pathname.replace('/static/', '/src/')}`;
        const filePath = `${pathname.replace('/static/', './src/')}`;
        // const filePath = `${pathname.replace('/static/', '../../../src/')}`;

        if (filePath.endsWith('.ts')) {
          // const result = await build({
          //   plugins: [
          //     httpImports({ disableCache: true, sideEffects: false })
          //   ],
          //   entryPoints: [
          //     filePath,
          //   ],
          //   bundle: false,
          //   write: false,
          //   format: 'esm',
          //   platform: 'browser',
          // });

          // const transpiledCode = result.outputFiles[0].text;

          // const url = new URL(filePath, import.meta.url);
          // const result = await transpile(
          //   url,
          //   {
          //     importMap: './deno.json',
          //   },
          // );
          // const code = result.get(url.href);

          const result = await bundle(
            filePath,
            {
              importMap: './deno.json',
              allowRemote: true,
            },
          );
          const code = result.code;

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

  // Watch for file changes and notify clients
  const watcher = Deno.watchFs('./src');
  for await (const event of watcher) {
    if (event.kind === 'modify') {
      for (const client of clients) {
        client.send('reload');
      }
    }
  }
}

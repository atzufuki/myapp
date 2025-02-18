# My App

This project is an example web application built using Deno, a modern runtime
for JavaScript and TypeScript. The application uses various modules and
libraries, such as `@alexi/db`, `@alexi/pwa`, and `@alexi/web`, to manage
database interactions, progressive web app features, and web application setup.

Key components of the project include:

- **Database Management**: Uses `IndexedDBBackend` and `DenoKVBackend` for
  database operations.
- **Web Application Setup**: Configured using `@alexi/web` and `@alexi/pwa` for
  setting up routes, installed apps, and static files.
- **Custom Elements**: Defines various HTML and Material Design components using
  `@alexi/html` and `@alexi/md3`.
- **Views and API**: Implements views and API endpoints for handling HTTP
  requests.

To run the server, you can use the command provided in the README.md:

```bash
deno -A --unstable-kv --env-file=.env.development manage.ts runserver
```

## Runserver

```bash
deno -A --unstable-kv --env-file=.env.development manage.ts runserver
```

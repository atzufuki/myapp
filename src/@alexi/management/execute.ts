import { managers } from '@alexi/apps/registry';

export async function execute() {
  const command = Deno.args[0];
  const subcommand = Deno.args[1];

  if (command) {
    if (subcommand === 'help') {
      for (const appName in managers) {
        const appConfig = managers[appName];
        if (appConfig.commands) {
          for (const commandName in appConfig.commands) {
            if (commandName === command) {
              const Command = appConfig.commands[commandName]['Command'];
              const cmd = new Command();
              console.info(cmd.help);
              return;
            }
          }
        }
      }
    }

    for (const app in managers) {
      const appConfig = managers[app];
      if (appConfig.commands) {
        for (const commandName in appConfig.commands) {
          if (commandName === command) {
            const Command = appConfig.commands[commandName]['Command'];
            const cmd = new Command();
            return await cmd.execute();
          }
        }
      }
    }
  } else {
    console.info(
      "Type 'npm run manage.ts help <subcommand>' for help on a specific subcommand.\n",
    );
    console.info('Available subcommands:\n');

    for (const appName in managers) {
      const appConfig = managers[appName];
      if (appConfig.commands) {
        console.info(`[${appName}]`);
        for (const commandName in appConfig.commands) {
          console.info(`  ${commandName}`);
        }
        console.info('');
      }
    }
  }
}

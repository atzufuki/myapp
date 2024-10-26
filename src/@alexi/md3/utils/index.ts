import * as md from '../elements';

export function showDialog(context: any, builder: (context: any) => any) {
  const dialog = builder(context);

  const app = document.querySelector<md.MaterialApp>(
    md.MaterialApp.getSelector(),
  );

  app.append(dialog);

  return dialog;
}

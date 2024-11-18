import process from 'node:process';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import { setup } from '@alexi/firebase/setup';
import { setupFunctions } from '@alexi/firebase/functions';
import { AdminFirestoreBackend } from '@alexi/firebase/backends';

import { MyApp } from 'myapp/app.ts';

await setup({
  INSTALLED_APPS: [
    //
    MyApp,
  ],
  DATABASES: {
    default: {
      NAME: 'default',
      ENGINE: AdminFirestoreBackend,
    },
  },
  FIREBASE: {
    TRANSACTION: null,
  },
});

const app = initializeApp({
  projectId: process.env.SECRET_FIREBASE_ADMIN_PROJECT_ID,
});
const firestore = getFirestore(app);
const settings = globalThis.alexi.conf.settings;

settings.FIREBASE.APP = app;
settings.FIREBASE.FIRESTORE = firestore;

// if (process.env.MODE === 'development') {
firestore.settings({
  ignoreUndefinedProperties: true,
  ssl: false,
  host: '0.0.0.0',
  port: 5002,
});
// } else {
//   firestore.settings({
//     ignoreUndefinedProperties: true,
//   });
// }

const myapp = setupFunctions();

const backend = new settings.DATABASES.default
  .ENGINE() as AdminFirestoreBackend;
await backend.init(settings.DATABASES.default.NAME);

export { myapp };

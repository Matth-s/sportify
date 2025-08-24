import express from 'express';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';

const app = express();

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.listen(3001, () => {
  console.log('le serveur ecoute sur le port 3001');
});

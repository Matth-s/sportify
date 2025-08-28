import express from 'express';
import cors from 'cors';

import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';
import { FRONTEND_URL } from './lib/env-config';
import { requireAuth } from './middlewares/required-auth-middleware';
import bodyParser from 'body-parser';

//routes
import groupRoutes from './routes/group-route';

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
  })
);

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// l utilisateur doit être connecté
app.use(requireAuth);

app.use('/api/group', groupRoutes);

app.listen(3001, () => {
  console.log('le serveur ecoute sur le port 3001');
});

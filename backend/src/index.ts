import express from 'express';
import cors from 'cors';

import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';
import { FRONTEND_URL } from './lib/env-config';
import { requireAuth } from './middlewares/required-auth-middleware';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

//routes
import groupRoutes from './routes/group-route';

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

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

app.set('io', io);

io.on('connection', (socket) => {
  socket.on('joinGroupRoom', (groupId) =>
    socket.join(`group-${groupId}`)
  );
  socket.on('leaveGroupRoom', (groupId) =>
    socket.leave(`group-${groupId}`)
  );
});

app.use('/api/group', groupRoutes);

server.listen(3001, () => {
  console.log('le serveur ecoute sur le port 3001');
});

require('dotenv').config();
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Socket, Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true,
  },
});

io.on('connection', (socket: Socket) => {
  console.log('User connected');

  socket.on('join', (room) => {
    console.log(`A user joined the room ${room}`);
    socket.join(room);
  });

  socket.on('play', ({ id, room }) => {
    console.log(`play at ${id} to ${room}`);
    socket.broadcast.to(room).emit('updateGame', id);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(process.env.PORT || 4000, () => {
  console.log('Server is runnind on port 4000');
});

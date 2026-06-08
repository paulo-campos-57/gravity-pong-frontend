import { io } from 'socket.io-client';

const URL = 'https://gravity-pong-backend.onrender.com/';

export const socket = io(URL, {
  autoConnect: true,
});
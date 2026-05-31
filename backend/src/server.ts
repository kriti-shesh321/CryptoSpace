import http from 'http';
import Redis from 'ioredis';

import { initializeApp } from './app';
import { ENV } from './config/env';
import { initializeSocket } from './sockets/socket';

async function startServer() {

  const app = await initializeApp();

  const server = http.createServer(app);

  const subscriber = new Redis(ENV.REDIS_URL);

  await subscriber.subscribe('alert-events');

  const io = initializeSocket(server);

  subscriber.on(
    'message',
    (_channel, message) => {

      const payload = JSON.parse(message);

      io.emit(
        'alert-triggered',
        payload
      );

      console.log('Socket event emitted');
    }
  );

  server.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
import express from 'express';
import bodyParser from 'body-parser';
import { ENV } from "./config/env";
import { checkDB } from './config/db';
import { checkRedis } from './config/redis';

const PORT = ENV.PORT;

const app = express();

app.use(bodyParser.json());

//health check endpoint
app.get('/health', async (req, res) => {
    try {
        await checkDB();
        await checkRedis();
        res.json({ status: 'OK', db: 'connected', redis: 'connected' });
    } catch (err) {
        res.status(500).json({ status: 'ERROR', error: String(err) });
    }
});

export async function startServer() {
  await checkDB();
  await checkRedis();

  app.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT}`);
  });
}

export default app;
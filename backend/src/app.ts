import express from 'express';
import { ENV } from "./config/env";
import { checkDB } from './config/db';
import { checkRedis } from './config/redis';
import authRoutes from './modules/auth/auth.routes';
import alertRoutes from './modules/alerts/alert.routes';

const PORT = ENV.PORT;

const app = express();

app.use(express.json());

// health check endpoint
app.get('/health', async (req, res) => {
  try {
    res.json({ status: 'OK' });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: String(err) });
  }
});

// auth routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/alerts', alertRoutes);

export async function startServer() {
  await checkDB();
  await checkRedis();

  app.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT}`);
  });
}

export default app;
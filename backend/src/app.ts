import express from 'express';
import { checkDB } from './config/db';
import { checkRedis } from './config/redis';
import authRoutes from './modules/auth/auth.routes';
import alertRoutes from './modules/alerts/alert.routes';

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
// alert routes
app.use('/api/v1/alerts', alertRoutes);

export async function initializeApp() {
  await checkDB();
  await checkRedis();

  return app;
}
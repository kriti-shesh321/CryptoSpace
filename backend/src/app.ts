import express from 'express';
import cors from 'cors';
import { checkDB } from './config/db';
import { checkRedis } from './config/redis';
import authRoutes from './modules/auth/auth.routes';
import alertRoutes from './modules/alerts/alert.routes';
import watchlistRoutes from './modules/watchlist/watchlist.routes';
import priceRoutes from './modules/prices/price.routes';

const app = express();

app.use(express.json());
app.use(cors());

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
// watchlist routes
app.use('/api/v1/watchlist', watchlistRoutes);
// price routes
app.use('/api/v1/prices', priceRoutes);

export async function initializeApp() {
  await checkDB();
  await checkRedis();

  return app;
}
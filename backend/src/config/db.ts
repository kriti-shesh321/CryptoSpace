import { Pool } from 'pg';
import { ENV } from './env';

export const pool = new Pool({
  connectionString: ENV.DB_URL,
});

export async function checkDB() {
  await pool.query('SELECT 1');
}
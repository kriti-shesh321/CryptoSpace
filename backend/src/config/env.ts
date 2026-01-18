import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), '.env.dev'),
});

function required(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`${key} is not set`);
  return value;
}

export const ENV = {
  PORT: Number(process.env.PORT) || 8000,
  DB_URL: required('PG_DB_PUBLIC_URL'),
  REDIS_URL: required('REDIS_PUBLIC_URL'),
  JWT_SECRET: required('JWT_SECRET'),
};
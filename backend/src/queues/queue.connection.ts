import Redis from 'ioredis';
import { ENV } from '../config/env';

export const queueConnection = new Redis(
    ENV.REDIS_URL,
    {
        maxRetriesPerRequest: null,
    }
);
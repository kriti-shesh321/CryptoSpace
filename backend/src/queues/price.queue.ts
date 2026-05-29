import { Queue } from 'bullmq';
import { queueConnection } from './queue.connection';

export const priceQueue = new Queue(
    'price-fetch',
    {
        connection: queueConnection,
    }
);
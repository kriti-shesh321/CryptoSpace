import { Queue } from 'bullmq';
import { queueConnection } from './queue.connection';

export const alertQueue = new Queue(
    'alert-evaluation',
    {
        connection: queueConnection,
    }
);
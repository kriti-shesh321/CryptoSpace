import { priceQueue } from '../src/queues/price.queue';
import '../src/workers/price.worker';

async function start() {

    await priceQueue.add(
        'fetch-prices',
        {},
        {
            repeat: {
                every: 30000,
            },
        }
    );

    console.log('Price worker started');
}

start();
import { Worker } from 'bullmq';
import { queueConnection } from '../queues/queue.connection';
import { fetchPrices } from '../modules/prices/price.service';
import { metrics } from '../metrics/metrics';
import { cachePrice } from '../modules/prices/price-cache.service';
import { insertSnapshot } from '../modules/prices/price.repository';

export const priceWorker = new Worker(
    'price-fetch',
    async () => {

        metrics.workerRuns++;

        const prices = await fetchPrices();

        for (const coin of prices) {

            await cachePrice(
                coin.coinId,
                coin.price
            );

            await insertSnapshot(
                coin.coinId,
                coin.price
            );
        }

        console.log('Prices updated');
    },
    {
        connection: queueConnection,
    }
);

priceWorker.on('failed', (job, error) => {
    metrics.workerFailures++;
    console.error(error);
});
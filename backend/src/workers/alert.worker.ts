import { Worker } from 'bullmq';

import { queueConnection } from '../queues/queue.connection';
import { getPrice } from '../modules/prices/price-cache.service';
import { getActiveAlerts } from '../modules/alerts/alert.repository';

import {
    getLastTrigger,
    createAlertHistory,
} from '../modules/alerts/alert-history.repository';

import { shouldTriggerAlert } from '../modules/alerts/alert-evaluator.service';

import { publishAlert } from "../services/pubsub.service";


export const alertWorker = new Worker(
    'alert-evaluation',

    async () => {
        const alerts = await getActiveAlerts();

        for (const alert of alerts) {

            const currentPrice = await getPrice(alert.coinId);

            if (!currentPrice) continue;

            const shouldTrigger =
                shouldTriggerAlert(
                    alert,
                    currentPrice
                );

            if (!shouldTrigger) continue;

            const lastTrigger = await getLastTrigger(alert.id);

            if (lastTrigger) {

                const elapsedSeconds =
                    (
                        Date.now() -
                        new Date(
                            lastTrigger.triggered_at
                        ).getTime()
                    ) / 1000;

                if (elapsedSeconds < alert.cooldownSeconds) {
                    continue;
                }
            }

            const deliveryKey = `${alert.id}-${Date.now()}`;

            await createAlertHistory(
                alert.id,
                currentPrice,
                deliveryKey
            );

            // Publish to Pub/Sub
            await publishAlert({
                coin: alert.coinId,
                price: currentPrice,
                message: `${alert.coinId} crossed threshold`,
            });

            console.log(`Alert Triggered: ${alert.id}`);

        }
    },

    {
        connection: queueConnection,
    }
);
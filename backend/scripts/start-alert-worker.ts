import { alertQueue } from '../src/queues/alert.queue';

import '../src/workers/alert.worker';

async function start() {

    await alertQueue.add(
        'evaluate-alerts',
        {},
        {
            repeat: {
                every: 30000,
            },
        }
    );

    console.log('Alert worker started');
}

start();
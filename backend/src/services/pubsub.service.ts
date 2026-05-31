import { redis } from '../config/redis';

export async function publishAlert(
    payload: unknown
) {
    await redis.publish(
        'alert-events',
        JSON.stringify(payload)
    );
}
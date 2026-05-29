import { redis } from '../../config/redis';
import { metrics } from '../../metrics/metrics';

export async function cachePrice(coinId: string, price: number) {
    await redis.set(
        `price:${coinId}`,
        JSON.stringify({ price }),
        'EX',
        60
    );

    metrics.cacheWrites++;
}

export async function getPrice(coinId: string): Promise<number | null> {

    const value = await redis.get(
        `price:${coinId}`
    );

    if (!value) return null;

    const parsed = JSON.parse(value);

    return parsed.price;
}
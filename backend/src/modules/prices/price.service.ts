import { ENV } from '../../config/env';
import { metrics } from '../../metrics/metrics';
import { CoinPrice, LivePrice, PriceSnapshot } from './price.types';
import { TRACKED_COINS, isTrackedCoin } from './price.constant';
import { getPrice } from './price-cache.service';
import { getSnapshotHistory } from './price.repository';

const MAX_HISTORY_DAYS = 30;
const DEFAULT_HISTORY_DAYS = 7;

export async function fetchPrices(): Promise<CoinPrice[]> {

    const url =
        `${ENV.COINGECKO_BASE_URL}/simple/price` +
        `?ids=${TRACKED_COINS.join(',')}` +
        `&vs_currencies=usd`;

    const response = await fetch(url, {
        headers: {
            'x-cg-demo-api-key': ENV.COINGECKO_API_KEY,
        },
    });

    if (!response.ok) {
        throw new Error('PRICE_FETCH_FAILED');
    }

    const data = await response.json();

    metrics.apiCallsMade++;

    return TRACKED_COINS.map((coinId) => ({
        coinId,
        price: data[coinId].usd,
    }));
}

export async function getLivePrices(): Promise<LivePrice[]> {
    return Promise.all(
        TRACKED_COINS.map(async (coinId) => ({
            coinId,
            price: await getPrice(coinId),
        }))
    );
}

export async function getPriceHistory(
    coinId: string,
    days: number = DEFAULT_HISTORY_DAYS
): Promise<PriceSnapshot[]> {
    if (!isTrackedCoin(coinId)) {
        throw new Error('INVALID_COIN');
    }

    const clampedDays = Math.min(
        Math.max(days, 1),
        MAX_HISTORY_DAYS
    );

    return getSnapshotHistory(coinId, clampedDays);
}
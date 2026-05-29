import { ENV } from '../../config/env';
import { metrics } from '../../metrics/metrics';
import { CoinPrice } from './price.types';
import { TRACKED_COINS } from './price.constant';

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
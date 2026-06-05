import * as repository from './watchlist.repository';
import { toWatchlistItem } from './watchlist.mapper';
import { isTrackedCoin } from '../prices/price.constant';

export async function addCoin(
    userId: string,
    coinId: string
) {

    if (!isTrackedCoin(coinId)) {
        throw new Error('INVALID_COIN');
    }

    const existing =
        await repository.findCoin(
            userId,
            coinId
        );

    if (existing) {
        throw new Error(
            'WATCHLIST_ITEM_EXISTS'
        );
    }

    const dbItem =
        await repository.addCoin(
            userId,
            coinId
        );

    return toWatchlistItem(dbItem);
}

export async function getWatchlist(
    userId: string
) {

    const items =
        await repository.getWatchlist(
            userId
        );

    return items.map(
        toWatchlistItem
    );
}

export async function removeCoin(
    userId: string,
    coinId: string
) {

    if (!isTrackedCoin(coinId)) {
        throw new Error('INVALID_COIN');
    }

    const item =
        await repository.removeCoin(
            userId,
            coinId
        );

    if (!item) {
        throw new Error(
            'WATCHLIST_ITEM_NOT_FOUND'
        );
    }
}
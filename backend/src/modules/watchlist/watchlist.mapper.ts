import { DbWatchlistItem, WatchlistItem, } from './watchlist.types';

export function toWatchlistItem(dbItem: DbWatchlistItem): WatchlistItem {

    return {
        id: dbItem.id,
        coinId: dbItem.coin_id,
        createdAt: dbItem.created_at,
    };
}
import { api } from './api';
import { WatchlistItem, AddWatchlistItemRequest } from '../types/watchlist.types';

export async function getWatchlist(): Promise<WatchlistItem[]> {

    const response =
        await api.get<WatchlistItem[]>(
            '/watchlist'
        );

    return response.data;
}

export async function addToWatchlist(
    data: AddWatchlistItemRequest
): Promise<WatchlistItem> {

    const response =
        await api.post<WatchlistItem>(
            '/watchlist',
            data
        );

    return response.data;
}

export async function removeFromWatchlist(
    coinId: string
): Promise<void> {

    await api.delete(
        `/watchlist/${coinId}`
    );
}

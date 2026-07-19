export interface WatchlistItem {
    id: string;
    coinId: string;
    createdAt: string;
}

export interface AddWatchlistItemRequest {
    coinId: string;
}

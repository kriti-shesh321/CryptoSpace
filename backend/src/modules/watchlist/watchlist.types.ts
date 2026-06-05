export interface CreateWatchlistItemRequest {
    coinId: string;
}

export interface DbWatchlistItem {
    id: string;
    user_id: string;
    coin_id: string;
    created_at: string;
}

export interface WatchlistItem {
    id: string;
    coinId: string;
    createdAt: string;
}
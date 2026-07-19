export interface CoinPrice {
    coinId: string;
    price: number;
}

export interface LivePrice {
    coinId: string;
    price: number | null;
}

export interface PriceSnapshot {
    price: number;
    ts: Date;
}
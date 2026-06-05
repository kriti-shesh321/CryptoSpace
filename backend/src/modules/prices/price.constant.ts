export const TRACKED_COINS = [
    'bitcoin',
    'ethereum',
    'solana',
] as const;

export function isTrackedCoin(coinId: string): boolean {
    return TRACKED_COINS.includes(
        coinId as typeof TRACKED_COINS[number]
    );
}
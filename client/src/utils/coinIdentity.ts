import { TRACKED_COINS } from './constants';

type TrackedCoin = typeof TRACKED_COINS[number];

export function toTrackedCoinId(name: string): TrackedCoin | null {
    const slug = name.trim().toLowerCase();
    return (TRACKED_COINS as readonly string[]).includes(slug)
        ? (slug as TrackedCoin)
        : null;
}

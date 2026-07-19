import { pool } from '../../config/db';
import { PriceSnapshot } from './price.types';

export async function insertSnapshot(coinId: string, price: number) {
    await pool.query(
        `
        INSERT INTO price_snapshots
        (coin_id, price, ts)
        VALUES ($1, $2, now())
        `,
        [coinId, price]
    );
}

export async function getSnapshotHistory(
    coinId: string,
    days: number
): Promise<PriceSnapshot[]> {
    const result = await pool.query(
        `
        SELECT price, ts
        FROM price_snapshots
        WHERE coin_id = $1
        AND ts >= now() - ($2 || ' days')::interval
        ORDER BY ts ASC
        `,
        [coinId, days]
    );

    return result.rows.map((row) => ({
        price: Number(row.price),
        ts: row.ts,
    }));
}
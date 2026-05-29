import { pool } from '../../config/db';

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
import { pool } from '../../config/db';

import { DbWatchlistItem, } from './watchlist.types';

export async function addCoin(userId: string, coinId: string) {

    const result = await pool.query<DbWatchlistItem>(
        `INSERT INTO watchlist_items (user_id, coin_id) VALUES ($1, $2) RETURNING *`,
        [userId, coinId]
    );

    return result.rows[0];
}

export async function getWatchlist(
    userId: string
) {

    const result =
        await pool.query<DbWatchlistItem>(
            `
            SELECT *
            FROM watchlist_items
            WHERE user_id = $1
            ORDER BY created_at DESC
            `,
            [userId]
        );

    return result.rows;
}

export async function removeCoin(
    userId: string,
    coinId: string
) {

    const result =
        await pool.query(
            `
            DELETE FROM watchlist_items
            WHERE
                user_id = $1
                AND coin_id = $2
            RETURNING *
            `,
            [userId, coinId]
        );

    return result.rows[0];
}

export async function findCoin(
    userId: string,
    coinId: string
) {

    const result =
        await pool.query<DbWatchlistItem>(
            `
            SELECT *
            FROM watchlist_items
            WHERE
                user_id = $1
                AND coin_id = $2
            `,
            [userId, coinId]
        );

    return result.rows[0];
}
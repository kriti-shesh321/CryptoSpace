import { pool } from '../../config/db';

export async function createAlertHistory(
    alertId: string,
    triggerPrice: number,
    deliveryKey: string
) {

    await pool.query(
        `
        INSERT INTO alert_history
        (
            alert_id,
            trigger_price,
            delivered_via,
            delivery_idempotency_key
        )
        VALUES
        (
            $1,
            $2,
            ARRAY['websocket'],
            $3
        )
        `,
        [
            alertId,
            triggerPrice,
            deliveryKey,
        ]
    );
}

export async function getLastTrigger(
    alertId: string
) {

    const result = await pool.query(
        `
        SELECT *
        FROM alert_history
        WHERE alert_id = $1
        ORDER BY triggered_at DESC
        LIMIT 1
        `,
        [alertId]
    );

    return result.rows[0];
}
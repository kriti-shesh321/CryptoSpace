import { pool } from '../../config/db';
import {
    Alert,
    CreateAlertRequest,
    DbAlert,
    UpdateAlertRequest,
} from './alert.types';
import { ALERT_OPERATORS, ALERT_TYPES } from './alert.constants';
import { toAlert } from './alert.mapper';

export async function getAlerts(userId: string): Promise<Alert[]> {
    const result = await pool.query<DbAlert>(
        `SELECT * FROM alerts WHERE user_id = $1 ORDER BY created_at DESC`,
        [userId]
    );

    return result.rows.map(toAlert);
}

export async function createAlert(
    userId: string,
    data: CreateAlertRequest
): Promise<Alert> {
    if (
        !ALERT_TYPES.includes(data.type) ||
        !ALERT_OPERATORS.includes(data.operator) ||
        data.value <= 0 ||
        (data.cooldownSeconds !== undefined && data.cooldownSeconds <= 0)
    ) {
        throw new Error('INVALID_ALERT_DATA');
    }

    const result = await pool.query<DbAlert>(
        `INSERT INTO alerts
     (user_id, coin_id, type, operator, value, cooldown_seconds)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
        [
            userId,
            data.coinId,
            data.type,
            data.operator,
            data.value,
            data.cooldownSeconds ?? 1800,
        ]
    );

    return toAlert(result.rows[0]);
}

export async function updateAlert(
    userId: string,
    alertId: string,
    data: UpdateAlertRequest
): Promise<Alert> {
    if (
        (data.operator && !ALERT_OPERATORS.includes(data.operator)) ||

        (data.value !== undefined && data.value <= 0) ||

        (data.cooldownSeconds !== undefined && data.cooldownSeconds <= 0)
    ) {
        throw new Error('INVALID_ALERT_DATA');
    }

    const result = await pool.query<DbAlert>(
        `UPDATE alerts
     SET
       operator = COALESCE($1, operator),
       value = COALESCE($2, value),
       cooldown_seconds = COALESCE($3, cooldown_seconds),
       is_active = COALESCE($4, is_active),
       updated_at = now()
     WHERE id = $5 AND user_id = $6
     RETURNING *`,
        [
            data.operator,
            data.value,
            data.cooldownSeconds,
            data.isActive,
            alertId,
            userId,
        ]
    );

    if (!result.rows[0]) throw new Error('ALERT_NOT_FOUND');

    return toAlert(result.rows[0]);
}

export async function deleteAlert(
    userId: string,
    alertId: string
): Promise<void> {
    const result = await pool.query(
        `DELETE FROM alerts
     WHERE id = $1 AND user_id = $2`,
        [alertId, userId]
    );

    if (result.rowCount === 0) throw new Error('ALERT_NOT_FOUND');
}
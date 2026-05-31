import { pool } from '../../config/db';
import { DbAlert, Alert } from './alert.types';
import { toAlert } from './alert.mapper';

export async function getActiveAlerts(): Promise<Alert[]> {

    const result = await pool.query<DbAlert>(
        `
        SELECT *
        FROM alerts
        WHERE is_active = true
        `
    );

    return result.rows.map(toAlert);
}
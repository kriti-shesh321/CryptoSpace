import { DbAlert, Alert } from './alert.types';

export function toAlert(dbAlert: DbAlert): Alert {
    return {
        id: dbAlert.id,
        coinId: dbAlert.coin_id,
        type: dbAlert.type,
        operator: dbAlert.operator,
        value: Number(dbAlert.value),
        cooldownSeconds: dbAlert.cooldown_seconds,
        isActive: dbAlert.is_active,
        createdAt: dbAlert.created_at,
        updatedAt: dbAlert.updated_at,
    };
}
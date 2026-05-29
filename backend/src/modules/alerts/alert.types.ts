export type AlertType = 'price_threshold';
export type AlertOperator = '>' | '<' | 'cross_up' | 'cross_down';

export interface CreateAlertRequest {
    coinId: string;
    type: AlertType;
    operator: AlertOperator;
    value: number;
    cooldownSeconds?: number;
}

export interface UpdateAlertRequest {
    operator?: AlertOperator;
    value?: number;
    cooldownSeconds?: number;
    isActive?: boolean;
}

export interface DbAlert {
    id: string;
    user_id: string;
    coin_id: string;
    type: AlertType;
    operator: AlertOperator;
    value: string;
    cooldown_seconds: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Alert {
    id: string;
    coinId: string;
    type: AlertType;
    operator: AlertOperator;
    value: string;
    cooldownSeconds: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
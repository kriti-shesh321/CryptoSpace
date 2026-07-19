export type AlertType = 'price_threshold';
export type AlertOperator = '>' | '<' | 'cross_up' | 'cross_down';

// backend accepts cross_up/cross_down but alert-evaluator.service.ts only
// implements >/< — cross_up/cross_down silently never trigger, so the
// create form only offers >/<.
export type CreatableAlertOperator = '>' | '<';

export interface Alert {
    id: string;
    userId: string;
    coinId: string;
    type: AlertType;
    operator: AlertOperator;
    value: number;
    cooldownSeconds: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateAlertRequest {
    coinId: string;
    type: AlertType;
    operator: CreatableAlertOperator;
    value: number;
    cooldownSeconds?: number;
}

export interface UpdateAlertRequest {
    operator?: CreatableAlertOperator;
    value?: number;
    cooldownSeconds?: number;
    isActive?: boolean;
}

export interface AlertTriggeredPayload {
    userId: string;
    coin: string;
    price: number;
    message: string;
}

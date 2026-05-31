import { Alert } from './alert.types';

export function shouldTriggerAlert(
    alert: Alert,
    currentPrice: number
): boolean {

    switch (alert.operator) {

        case '>':
            return currentPrice > alert.value;

        case '<':
            return currentPrice < alert.value;

        default:
            return false;
    }
}
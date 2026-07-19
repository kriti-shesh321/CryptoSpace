import { api } from './api';
import {
    Alert,
    CreateAlertRequest,
    UpdateAlertRequest,
} from '../types/alert.types';

export async function getAlerts(): Promise<Alert[]> {

    const response =
        await api.get<Alert[]>(
            '/alerts'
        );

    return response.data;
}

export async function createAlert(
    data: CreateAlertRequest
): Promise<Alert> {

    const response =
        await api.post<Alert>(
            '/alerts',
            data
        );

    return response.data;
}

export async function updateAlert(
    id: string,
    data: UpdateAlertRequest
): Promise<Alert> {

    const response =
        await api.patch<Alert>(
            `/alerts/${id}`,
            data
        );

    return response.data;
}

export async function deleteAlert(
    id: string
): Promise<void> {

    await api.delete(
        `/alerts/${id}`
    );
}

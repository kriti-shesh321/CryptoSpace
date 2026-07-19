import { create } from 'zustand';
import { AlertTriggeredPayload } from '../types/alert.types';

export interface Notification extends AlertTriggeredPayload {
    id: string;
}

interface NotificationState {
    notifications: Notification[];
    addNotification: (payload: AlertTriggeredPayload) => void;
    dismissNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
    notifications: [],

    addNotification: (payload) => {
        const notification: Notification = {
            ...payload,
            id: `${payload.userId}-${payload.coin}-${payload.price}-${Math.random()}`,
        };

        set((state) => ({
            notifications: [...state.notifications, notification],
        }));
    },

    dismissNotification: (id) => {
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
        }));
    },
}));

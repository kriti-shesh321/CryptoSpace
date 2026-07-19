import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL.replace(/\/api\/v\d+\/?$/, '');

let socket: Socket | null = null;

export const connectSocket = (token: string) => {
    if (socket?.connected) return socket;

    socket = io(SOCKET_URL, {
        auth: { token },
    });

    return socket;
};

export const disconnectSocket = () => {
    socket?.disconnect();
    socket = null;
};

export const getSocket = () => socket;

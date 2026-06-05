import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

let io: Server;

export function initializeSocket(server: any): Server {
    io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        try {

            const token = socket.handshake.auth.token;

            if (!token) {
                socket.disconnect();
                return;
            }

            const payload = jwt.verify(token, ENV.JWT_SECRET) as { userId: string; };

            socket.join(`user:${payload.userId}`);

            console.log(`User ${payload.userId} joined room user:${payload.userId}`);

        } catch (error) {
            socket.disconnect();
        }
    });

    return io;
}

export function getIO() {
    if (!io) {
        throw new Error('Socket not initialized');
    }

    return io;
}
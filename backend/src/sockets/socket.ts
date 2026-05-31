import { Server } from 'socket.io';

let io: Server;

export function initializeSocket(server: any): Server {
    io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`);
    });

    return io;
}

export function getIO() {
    if (!io) {
        throw new Error('Socket not initialized');
    }

    return io;
}
import { Server } from 'socket.io';
export const initSocket = (server) => {
    const io = new Server(server, {
        pingTimeout: 60000,
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true,
        },
        transports: ['websocket'],
    });
    io.on('connection', (socket) => {
        console.log(`A Client connected with ID: ${socket.id}`);
        socket.on('joinRoom', (room) => {
            socket.join(room);
            console.log(`A Client with ID ${socket.id} joined room: ${room}`);
        });
        socket.on('leaveRoom', (room) => {
            socket.leave(room);
            console.log(`Client ${socket.id} left room: ${room}`);
        });
        socket.on('disconnect', () => {
            socket.removeAllListeners();
            console.log(`A Client with ID ${socket.id} disconnected`);
        });
    });
    return io;
};

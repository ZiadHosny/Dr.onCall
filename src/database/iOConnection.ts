import { Server, Socket } from "socket.io";
import http from 'http'

export const initSocket = (server: http.Server): Server => {
    const io = new Server(server, {
        pingTimeout: 60000,
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true,
        },
        transports: ['websocket'],
    });

    io.on("connection", (socket: Socket) => {
        console.log(`A Client connected with ID: ${socket.id}`);
        socket.on("joinRoom", (room: string) => {
            socket.join(room);
            console.log(`A Client with ID ${socket.id} joined room: ${room}`);
        });

        socket.on("leaveRoom", (room: string) => {
            socket.leave(room);
            console.log(`Client ${socket.id} left room: ${room}`);
        });

        socket.on("disconnect", () => {
            socket.removeAllListeners();
            console.log(`A Client with ID ${socket.id} disconnected`);
        });
    });

    return io;
};

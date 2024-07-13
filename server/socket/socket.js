import { Server } from "socket.io";
import http from "http";
import express from "express"

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ["GET", "POST", "PUT","PATCH", "DELETE"],
    }
});

const userSocketMap = {}

export const getReciverSockerId = (receiverId) => {
    return userSocketMap[receiverId];
}

io.on("connection", (socket) => {
    console.log("a user connected", socket.id)

    const userId = socket.handshake.query.userId;

    if (userId !== undefined && userId !== null) {
        userSocketMap[userId] = socket.id;
      }

    //io.emit() is used to send evets to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));


    socket.on("disconnect", ()=> {
        console.log("user disconnected", socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})


export {app, io, server};
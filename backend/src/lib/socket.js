import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === "development" 
      ? ["http://localhost:5173", "http://localhost:5174", "http://localhost:5176", "http://127.0.0.1:5173", "http://127.0.0.1:5174", "http://127.0.0.1:5176"]
      : process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
  },
});

export function getReceiverSocketId(userId) {
  const userSockets = userSocketMap.get(userId);
  return userSockets ? Array.from(userSockets)[0] : null;
}

// used to store online users
const userSocketMap = new Map(); // {userId: Set<socketId>}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    // Add new socket to user's set of connections
    if (!userSocketMap.has(userId)) {
      userSocketMap.set(userId, new Set());
    }
    userSocketMap.get(userId).add(socket.id);

    // Get unique online users (users with at least one active connection)
    const onlineUsers = Array.from(userSocketMap.keys());
    io.emit("getOnlineUsers", onlineUsers);
  }

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    if (userId && userSocketMap.has(userId)) {
      // Remove this socket from user's set
      userSocketMap.get(userId).delete(socket.id);
      
      // If user has no more active connections, remove them from the map
      if (userSocketMap.get(userId).size === 0) {
        userSocketMap.delete(userId);
      }
      
      // Update online users list
      const onlineUsers = Array.from(userSocketMap.keys());
      io.emit("getOnlineUsers", onlineUsers);
    }
  });
});

export { io, app, server };

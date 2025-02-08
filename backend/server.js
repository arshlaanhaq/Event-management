import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";

// Environment variables setup
dotenv.config();

// Database connection
connectDB()

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(cors());

// Socket.IO setup
const io = new Server(server, {
    cors: {
        origin: "*", // Adjust as needed
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("joinEvent", (eventId) => {
        socket.join(eventId);
        console.log(`User joined event: ${eventId}`);
    });

    socket.on("leaveEvent", (eventId) => {
        socket.leave(eventId);
        console.log(`User left event: ${eventId}`);
    });

    socket.on("updateAttendees", (eventId, count) => {
        io.to(eventId).emit("attendeeCountUpdated", count);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

// Routes
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/event.js";

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

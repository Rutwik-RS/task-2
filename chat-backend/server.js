const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Ensure this matches your frontend port
        methods: ["GET", "POST"]
    }
});

let chatHistory = []; // Store chat messages in memory (temporary)

io.on("connection", (socket) => {
    console.log(`New user connected: ${socket.id}`);

    // Send previous messages when a user connects
    socket.emit("chatHistory", chatHistory);

    socket.on("chatMessage", (msg) => {
        console.log("Received message from client:", msg); // Debugging log

        chatHistory.push(msg); // Store message in memory

        io.emit("chatMessage", msg); // Broadcast message to all clients
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

app.use(cors());

server.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});

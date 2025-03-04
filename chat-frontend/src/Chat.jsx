import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./styles.css"; // Styling

const socket = io("http://localhost:5000");

function Chat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("chatMessage", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => socket.off("chatMessage");
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("chatMessage", message);
            setMessage("");
        }
    };

    return (
        <div className="chat-container">
            <h1>Chat App</h1>
            <div className="messages">
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chat;

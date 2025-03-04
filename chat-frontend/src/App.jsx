import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./styles.css"; // Ensure this file exists

const socket = io("http://localhost:5000");

function App() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]); // Stores chat messages

    // Listen for incoming messages
    useEffect(() => {
      socket.on("chatMessage", (msg) => {
          console.log("Received message:", msg); // Debugging log
          setMessages((prev) => [...prev, msg]); // Append message
      });
  
      return () => {
          socket.off("chatMessage");
      };
  }, []);
  

    // Send message to server
    const sendMessage = () => {
      if (message.trim()) {
          console.log("Sending message:", message); // Debugging log
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

export default App;

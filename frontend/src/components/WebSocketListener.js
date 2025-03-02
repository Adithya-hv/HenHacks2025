import React, { useEffect, useState } from "react";
import socket from "../utils/websocket";

const WebSocketListener = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const handleMessage = (event) => {
            console.log("Received message:", event.data); // Add this line for debugging
            setMessages((prev) => [...prev, event.data]);
        };

        socket.addEventListener("message", handleMessage);

        return () => {
            socket.removeEventListener("message", handleMessage);
        };
    }, []);

    return (
        <div>
            <h2>WebSocket Messages</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
};

export default WebSocketListener;
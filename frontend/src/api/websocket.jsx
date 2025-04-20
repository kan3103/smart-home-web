import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { MYIP } from "../api/ip.js";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [door, setDoor] = useState(null);
    const [devices, setDevices] = useState([]);
    const [connected, setConnected] = useState(false);
    const socketRef = useRef(null);

    const handleInvalidToken = useCallback(() => {
        localStorage.removeItem("access_token");
        window.location.href = "/login";
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            window.location.href = "/login";
            return;
        }

        const socket = new WebSocket(`ws://${MYIP}/ws?token=${token}`);
        socketRef.current = socket;

        socket.onopen = () => {
            setConnected(true);
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.status === 401) {
                handleInvalidToken();
                return;
            }

            if (data.topic === "temperature") {
                setTemperature(data.message);
            } else if (data.topic === "humidity") {
                setHumidity(data.message);
            } else if (data.topic === "door") {
                setDoor(data);
            } else {
                setDevices((prev) => {
                    const index = prev.findIndex((d) => d.id === data.id);
                    if (index !== -1) {
                        const newDevices = [...prev];
                        newDevices[index] = { ...newDevices[index], value: data.value };
                        return newDevices;
                    } else {
                        return [...prev, data];
                    }
                });
            }
        };

        socket.onerror = (error) => {
            window.location.href = "/login";
        };

        socket.onclose = (event) => {
            setConnected(false);
            if (event.code !== 401 && localStorage.getItem("access_token")) {
                window.location.href = "/login";
            }
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [handleInvalidToken]);

    return (
        <WebSocketContext.Provider value={{ temperature, humidity, door, devices, connected }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocketContext = () => useContext(WebSocketContext);

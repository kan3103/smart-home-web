import { useEffect, useState, useCallback } from "react";

const Home_Temp = () => {
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [devices, setDevices] = useState([]);
    const [connected, setConnected] = useState(false);

    // Handle logout and token invalidation
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

        let socket = null;
        
        // Initialize WebSocket connection
        const connectWebSocket = () => {
            socket = new WebSocket(`ws://10.130.74.186:8000/ws?token=${token}`);
            
            socket.onopen = () => {
                console.log("WebSocket Connected");
                setConnected(true);
            };
            
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.status === 401) {
                    handleInvalidToken();
                    return;
                }
                
                if (data.topic === "temperature") {
                    console.log("Temperature:", data.message);
                    setTemperature(data.message);
                } else if (data.topic === "humidity") {
                    console.log("Humidity:", data.message);
                    setHumidity(data.message);
                } else {
                    setDevices((prevDevices) => {
                        const existingDevice = prevDevices.find((d) => d.id === data.id);
                        if (existingDevice) {
                            return prevDevices.map((device) =>
                                device.id === data.id ? { ...device, value: data.value } : device
                            );
                        } else {
                            return [...prevDevices, data];
                        }
                    });
                }
            };

            socket.onerror = (error) => {
                console.error("WebSocket Error:", error);
                setConnected(false);
            };

            socket.onclose = (event) => {
                console.log("WebSocket Disconnected", event.code, event.reason);
                setConnected(false);
                
                // Don't try to reconnect if token was invalid (logout case)
                if (event.code !== 4001 && localStorage.getItem("access_token")) {
                    console.log("Attempting to reconnect...");
                    setTimeout(connectWebSocket, 3000);
                }
            };
        };
        
        connectWebSocket();

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [handleInvalidToken]);

    return [temperature, humidity, devices, connected];
};

export default Home_Temp;

import { useEffect, useState } from "react";

const Home_Temp = () => {
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJraGFuZyIsImV4cCI6MTc0NDU5Mjk3Nn0.2dhRPocXS8a8eOoUqK8MZbvMpnYtstJAq68XVMzDF1M'; 
        const socket = new WebSocket(`ws://192.168.10.28:8000/ws?token=${token}`);

        socket.onopen = () => {
            console.log("WebSocket Connected");
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            
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
        };

        socket.onclose = () => {
            console.log("WebSocket Disconnected");
        };

        return () => {
            socket.close();
        };
    }, []);

    return [temperature, humidity, devices];
};

export default Home_Temp;
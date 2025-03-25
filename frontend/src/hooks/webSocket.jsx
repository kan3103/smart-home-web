import { useEffect, useState } from "react";

const Home_Temp = () => {
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        const socket = new WebSocket("ws://192.168.10.28:8000/ws");

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
                            device.id === data.id ? { ...device, status: data.status } : device
                        );
                    } else {
                        return [...prevDevices, data];
                    }
                });
                console.log("Devices:", devices);
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
import { useEffect, useState } from "react";
import {MYIP} from "../api/ip.js";

const Home_Temp = () => {
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [devices, setDevices] = useState([]);
    const myip = MYIP; 
    useEffect(() => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTc0NDY1MTUxNn0.35KNdcNnmrXGbIaB_aBr1BjhdsMsAPL3GeIZhZlMXfI'; 
        const socket = new WebSocket(`ws://${myip}/ws?token=${token}`);

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
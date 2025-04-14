import { useEffect, useState } from "react";

const Home_Temp = () => {
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            window.location.href = "/login";
            return;
        }

        const socket = new WebSocket(`ws://192.168.1.103:8000/ws?token=${token}`);

        socket.onopen = () => {
            console.log("WebSocket Connected");
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.status === 401) {
                localStorage.removeItem("access_token");
                window.location.href = "/login";
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

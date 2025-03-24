import { useEffect, useState } from "react";

const Home_Temp = () => {
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    useEffect(() => {
        const socket = new WebSocket("ws://10.230.96.48:8000/ws");

        socket.onopen = () => {
            console.log("WebSocket Connected");
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data); // Chuyển chuỗi JSON thành object
            if (data.topic === "temperature") {
                console.log(data.message);
                setTemperature(data.message);
            } else if (data.topic === "humidity") {
                console.log(data.message);
                setHumidity(data.message);
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

    return [temperature, humidity];
};

export default Home_Temp;
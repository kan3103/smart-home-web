import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    useCallback,
} from "react";
import { useNavigate } from "react-router-dom"; // 👈 Thêm
import { MYIP } from "../api/ip.js";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [door, setDoor] = useState(null);
    const [devices, setDevices] = useState([]);
    const [connected, setConnected] = useState(false);
    const socketRef = useRef(null);
    const navigate = useNavigate(); // 👈 Hook để điều hướng không reload

    const handleInvalidToken = useCallback(() => {
        localStorage.removeItem("access_token");
        navigate("/login");  
    }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        // Nếu không có token thì logout luôn
        if (!token) {
            handleInvalidToken();
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

            switch (data.topic) {
                case "temperature":
                    setTemperature(data.message);
                    break;
                case "humidity":
                    setHumidity(data.message);
                    break;
                case "door":
                    setDoor(data);
                    break;
                default:
                    setDevices((prev) => {
                        const index = prev.findIndex((d) => d.id === data.id);
                        if (index !== -1) {
                            const newDevices = [...prev];
                            newDevices[index] = {
                                ...newDevices[index],
                                value: data.value,
                            };
                            return newDevices;
                        } else {
                            return [...prev, data];
                        }
                    });
            }
        };

        socket.onerror = () => {
            handleInvalidToken();
        };

        socket.onclose = (event) => {
            setConnected(false);
            if (event.code !== 401 && localStorage.getItem("access_token")) {
                console.error("WebSocket closed unexpectedly:", event);
                handleInvalidToken();
            }
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [handleInvalidToken]);

    return (
        <WebSocketContext.Provider
            value={{ temperature, humidity, door, devices, connected }}
        >
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocketContext = () => useContext(WebSocketContext);

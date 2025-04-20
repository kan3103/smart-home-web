import { useWebSocketContext } from "../api/websocket";

const Home_Temp = () => {
    const { temperature, humidity, door, devices, connected } = useWebSocketContext();
    return [temperature, humidity, door, devices, connected];
};

export default Home_Temp;

import { useWebSocketContext } from "../api/websocket";

const Home_Temp = () => {
    const { temperature, humidity, door, devices, connected ,noti} = useWebSocketContext();
    return [temperature, humidity, door, devices ,connected, noti];
};

export default Home_Temp;

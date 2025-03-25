import axios from 'axios';
import light from "../assets/images/icon/light.png";
import wifi from "../assets/images/icon/wifi.png";

const getDevice = async () => {
    try {
        const response = await axios.get('/api/devices'); // Replace with your actual API endpoint
        const devices = response.data;

        return devices.map(device => {
            let image;
            switch (device.type) {
                case 'wifi':
                    image = wifi;
                    break;
                case 'light':
                    image = light;
                    break;
                default:
                    image = null; // or a default image
            }
            return { ...device, image };
        });
    } catch (error) {
        console.error('Error fetching devices:', error);
        return [];
    }
};

export default getDevice;
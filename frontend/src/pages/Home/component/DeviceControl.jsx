import light from "../../../assets/images/icon/light.png";
import Switch from "../../../component/Home/Switch";
import {React} from "react";
import fan from "../../../assets/images/icon/fan.png";

let isWifiState = true;
let wifiState = isWifiState? "ON": "OFF";
const DeviceControl = ({ devices = [] }) => {
    return (
        <div className="flex flex-wrap gap-3 p-2">
            {devices.map((device, index) => (
                <div
                    key={index}
                    className="relative w-[150px] h-[158px] bg-white rounded-[15px] shadow-md p-3"
                >
                    <img
                        className="w-[39px] h-[39px] mx-auto mt-4"
                        alt={device.name}
                        src={device.icon}
                    />
                    <div className="text-center mt-2 font-semibold text-black text-base">
                        {device.state ? "ON" : "OFF"}
                    </div>
                    <div className="text-center mt-2 font-semibold text-[#6b6bf9] text-base">
                        {device.name}
                    </div>
                    <div className="absolute top-2 right-2">
                        <Switch />
                    </div>
                </div>
            ))}
        </div>
    );
};
export default DeviceControl;
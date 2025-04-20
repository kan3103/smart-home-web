import React from "react";
import Card from "../../component/Home/Card";
// import Next from "../../component/Home/Next";
import Weather from "../../component/Home/Weather";
import Notify from "../Home/component/Notify";
import Members from "./component/Members";
// import Chart from "./component/Chart";
// import HelpWidget from "./component/HelpWidget";
import SlideBar from "./component/SlideBar";
import DeviceSensor from "./component/DeviceSensor";
import Header from "./component/Header";
import DeviceControl from "./component/DeviceControl";
import light from "../../assets/images/icon/light.png";
import fan from "../../assets/images/icon/fan.png";
import '../../index.css';

export const HomePage = () => {
    const sampleDevices = [
        { name: "Light 1", icon: light, state: true },
        { name: "Fan 1", icon: fan, state: false },
        { name: "Light 2", icon: light, state: true },
        { name: "Fan 2", icon: fan, state: false },
        { name: "Light 3", icon: light, state: true },
        { name: "Fan 3", icon: fan, state: false },
    ];

    return (
        <div className="bg-[#f3f3f3] min-h-screen flex flex-col items-center ">
            <Header />
            <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-4 w-full mt-4">
                {/* Cột 1 */}
                <div className="flex flex-col gap-4 p-2 w-full">
                    <SlideBar />
                    <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-4 p-2">
                        <div className="flex flex-col gap-4">
                            <DeviceSensor />
                            <DeviceControl devices={sampleDevices} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Weather />
                            {/* <HelpWidget /> */}
                        </div>
                    </div>
                </div>
                
                {/* Cột 2 */}
                <div className="flex flex-col gap-4 p-2">
                    <Notify />
                    <Members />
                </div>
            </div>
        </div>
    );
};

export default HomePage;

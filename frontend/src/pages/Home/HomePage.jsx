import React from "react";
import Weather from "../../component/Home/Weather";
import Notify from "../Home/component/Notify";
import Members from "./component/Members";
import SlideBar from "./component/SlideBar";
import DeviceSensor from "./component/DeviceSensor";
import Header from "./component/Header";
import DeviceControl from "./component/DeviceControl";
import '../../index.css';

export const HomePage = () => {
    return (
        <div className="bg-[#f3f3f3] min-h-screen flex flex-col items-center">
            <Header />
            
            <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-4 w-full mt-4 p-3">
                {/* Cột 1 */}
                <div className="flex flex-col gap-4 p-2 w-full">
                    <SlideBar />
                    <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-4 p-2">
                        <div className="flex flex-col gap-4">
                            <DeviceSensor />
                            <DeviceControl/>
                        </div>
                        <div className="flex flex-col gap-4">
                            <Weather />
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

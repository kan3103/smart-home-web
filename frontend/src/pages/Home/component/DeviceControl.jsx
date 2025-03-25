import React, { useState, useEffect } from "react";
import styled from "styled-components";
import light from "../../../assets/images/icon/light.png";
import fan from "../../../assets/images/icon/fan.png";
import Home_Temp from "../../../hooks/webSocket";
import Switch from "../../../component/Home/Switch";

const DeviceControl = () => {
    const [temperature, humidity, devices] = Home_Temp();
    const [deviceList, setDeviceList] = useState([]);

    useEffect(() => {
        if (devices) {
            setDeviceList([...devices]); // Create a new array to trigger React update
        }
    }, [devices]);

    const sendControlValue = async (id, value) => {
        try {
            const response = await fetch(`http://your-backend-url:8000/send/${id}/${value}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Control value sent successfully:', data);
        } catch (error) {
            console.error('Error sending control value:', error);
        }
    };

    const handleToggle = (index) => {
        const updatedDevice = {
            ...deviceList[index],
            value: deviceList[index].value === "1" ? "0" : "1",
        };
        const newDevices = deviceList.map((d, i) => (i === index ? updatedDevice : d));
        setDeviceList(newDevices);
        sendControlValue(updatedDevice.id, updatedDevice.value);
        console.log("Updated device:", updatedDevice);
    };

    return (
        <div className="flex flex-wrap gap-3 p-2">
            {deviceList.map((device, index) => (
                <div
                    key={index}
                    className="relative w-[150px] h-[158px] bg-white rounded-[15px] shadow-md p-3"
                >
                    <img
                        className="w-[39px] h-[39px] mx-auto mt-4"
                        alt={device.name}
                        src={device.type === "Light" ? light : fan}
                    />
                    <div className="text-center mt-2 font-semibold text-black text-base">
                        {device.value === "1" ? "ON" : "OFF"}
                    </div>
                    <div className="text-center mt-2 font-semibold text-[#6b6bf9] text-base">
                        {device.name}
                    </div>
                    <div className="absolute top-2 right-2">
                        <Switch status={device.value === "1"} onToggle={() => handleToggle(index)} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DeviceControl;
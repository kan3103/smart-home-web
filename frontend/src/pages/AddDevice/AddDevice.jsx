import React, { useState, useEffect } from "react";
import Header from "../Home/component/Header";
import Home_Temp from "../../hooks/webSocket";
import DeviceForm from "./DeviceForm";
import light from "../../assets/images/icon/light.png";
import fan from "../../assets/images/icon/fan.png";
import axios from "axios";
import { MYIP } from "../../api/ip";
const AddDevice = () => {
    const [, , devices] = Home_Temp(); // Get devices from the same hook used in HomePage
    const [deviceList, setDeviceList] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const setdevice = async () =>{
            const token = localStorage.getItem("access_token")
            if (!token) {
                window.location.href = "/login";
                return;
            }
            const response = await axios.get(
                `http://${MYIP}/device`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setDeviceList(response.data)
        }
        
        setdevice()
    }, []);

    const handleAddDevice = async (deviceData) => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            window.location.href = "/login";
            return;
        }

        try {
            const response = await axios.post(
                `http://${MYIP}/devices/add`,
                deviceData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Device added:", response.data);
            setShowForm(false);


            const newDevice = {
                id: `device_${Date.now()}`, // Temporary ID
                name: deviceData.name,
                type: deviceData.type,
                value: "0" // Default to OFF
            };

            setDeviceList([...deviceList, newDevice]);

        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem("access_token");
                window.location.href = "/login";
            } else {
                console.error("Error adding device:", error);
                alert("Failed to add device. Please try again.");
            }
        }
    };

    return (
        <div className="bg-[#f3f3f3] min-h-screen flex flex-col items-center">
            <Header />
            <div className="w-full max-w-6xl p-4">
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Device Management</h1>
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg flex items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2"
                            >
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Add Device
                        </button>
                    </div>

                    {/* Device List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {deviceList.map((device, index) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <div className="p-5">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center">
                                            <img
                                                className="w-12 h-12 mr-3"
                                                alt={device.name}
                                                src={device.type === "Light" ? light : fan}
                                            />
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800">
                                                    {device.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">{device.type}</p>
                                            </div>
                                        </div>
                                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                                            device.value === "1"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-gray-100 text-gray-800"
                                        }`}>
                                            {device.value === "1" ? "ON" : "OFF"}
                                        </span>
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <button className="text-sm text-blue-600 hover:text-blue-800 mr-4">
                                            Edit
                                        </button>
                                        <button className="text-sm text-red-600 hover:text-red-800">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal for adding device */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <DeviceForm
                        onClose={() => setShowForm(false)}
                        onAddDevice={handleAddDevice}
                    />
                </div>
            )}
        </div>
    );
};

export default AddDevice;

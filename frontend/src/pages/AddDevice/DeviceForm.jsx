import React, { useState } from "react";

const DeviceForm = ({ onClose, onAddDevice }) => {
    const [formData, setFormData] = useState({
        name: "",
        type: "Light",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form
        if (!formData.name.trim()) {
            alert("Please enter a device name");
            return;
        }

        onAddDevice(formData);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-50">
            <h2 className="text-xl font-bold mb-4 text-center">Add New Device</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="name">
                        Device Name
                    </label>
                    <input
                        className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Enter device name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        autoFocus
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 mb-2" htmlFor="type">
                        Device Type
                    </label>
                    <select
                        className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option value="Light">Light</option>
                        <option value="Fan">Fan</option>
                    </select>
                </div>

                <div className="flex justify-end">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                        type="button"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Add Device
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DeviceForm;

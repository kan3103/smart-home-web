import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MYIP } from "../../../api/ip.js"; // Import MYIP from your api file
const ProfileDropdown = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleAccountClick = () => {
        console.log("Go to Account");
    };

    const handleLogoutClick = async () => {
        const token = localStorage.getItem("access_token");
        localStorage.removeItem("access_token");
        console.log("Logged out successfully");

        try {
            const response = await axios.post(
                `http://${MYIP}/token/revoke`,
                { token: token },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Response:", response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem("access_token");
                window.location.href = "/login";
            } else {
                console.error("Error:", error);
            }
        }

        navigate("/login");
    };

    return (
        <div className="relative inline-block text-left">
            {/* Toggle Button */}
            <button
                onClick={handleToggle}
                className="tab p-2 rounded-full hover:bg-gray-200 transition-all"
            >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                </svg>
            </button>

            {/* Drill Down Menu */}
            {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50">
                    <button
                        onClick={handleAccountClick}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                        Account
                    </button>
                    <button
                        onClick={handleLogoutClick}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
                    >
                        Log out
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;

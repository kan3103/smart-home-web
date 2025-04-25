import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MYIP } from "../../api/ip";
import Home_Temp from "../../hooks/webSocket";
const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [temperature, humidity, door, devices ,connected, noti] = Home_Temp()
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const response = await axios.get(`http://${MYIP}/notifications/all`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setNotifications(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching notifications:", error);
                setLoading(false);
            }
        };
        fetchNotifications();
    }, [noti]);



    const handleNotificationClick = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.get(`http://${MYIP}/notifications/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Update local state to mark as read
            setNotifications(prevNotifications =>
                prevNotifications.map(notification =>
                    notification.id === id ? { ...notification, is_read: true } : notification
                )
            );
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="mr-4 text-gray-600 hover:text-gray-900"
                    >
                        <FaArrowLeft />
                    </button>
                    <h1 className="text-2xl font-bold">Notifications</h1>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="flex justify-center items-center h-48">
                            <p>Loading notifications...</p>
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="flex justify-center items-center h-48">
                            <p className="text-gray-500">No notifications</p>
                        </div>
                    ) : (
                        <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    onClick={() => handleNotificationClick(notification.id)}
                                    className={`flex items-start gap-4 p-4 border-b cursor-pointer transition-colors ${
                                        notification.is_read ? 'bg-white' : 'bg-blue-50'
                                    }`}
                                >
                                    <div className={`min-w-2 min-h-2 w-2 h-2 mt-2 rounded-full ${notification.is_read ? 'bg-gray-300' : 'bg-blue-500'}`} />
                                    <div className="flex-1">
                                        <p className={`${notification.is_read ? 'text-gray-600' : 'text-gray-800 font-medium'}`}>
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(notification.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationPage;

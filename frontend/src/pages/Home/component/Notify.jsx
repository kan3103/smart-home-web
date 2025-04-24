import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react"; // import icon
import { MYIP } from "../../../api/ip";
import Home_Temp from "../../../hooks/webSocket";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [temperature, humidity, door, devices ,connected, noti] = Home_Temp()
    // const navigate = useNavigate();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem("access_token");
                console.log(token)
                const response = await axios.get(`http://${MYIP}/notifications/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
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
            const token = localStorage.getItem("access_token");
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

    const navigateToNotifications = async () => {
        window.location.href = "/notification";
    };
    const handleDeleteNotification = async (id) => {
        try{
            const token = localStorage.getItem("access_token")
            const response = await axios.post(`http://${MYIP}/notification/delete`,{
                "noti_id":id
            }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            
            if (response.status==200){
                setNotifications(prevNotifications => 
                    prevNotifications.filter(notification => notification.id !== id)
                );
            }

        } catch(error){
            console.log("error:", error)
        }
        
    };
    
    return (
        <div className="flex flex-col w-full h-[300px] bg-white rounded-[15px] overflow-auto custom-scrollbar p-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Notifications</h3>
                <button 
                    onClick={navigateToNotifications}
                    className="text-xs text-blue-600 hover:underline"
                >
                    View All
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <p>Loading notifications...</p>
                </div>
            ) : notifications.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                    <p className="text-gray-500">No notifications</p>
                </div>
            ) : (
                notifications.slice(0, 5).map((notification) => (
                    <div 
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification.id)}
                        className={`flex justify-between items-start gap-3 p-3 border-b cursor-pointer transition-colors ${
                            notification.is_read ? 'bg-gray-50' : 'bg-blue-50'
                        }`}
                    >
                        <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 mt-2 rounded-full ${notification.is_read ? 'bg-gray-300' : 'bg-blue-500'}`} />
                            <div>
                                <p className={`text-sm ${notification.is_read ? 'text-gray-600' : 'text-gray-800 font-medium'}`}>
                                    {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {new Date(notification.created_at).toLocaleString()}
                                </p>
                            </div>
                        </div>
                        
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // tránh trigger handleNotificationClick
                                handleDeleteNotification(notification.id);
                            }}
                            className="text-gray-400 hover:text-red-500"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Notification;

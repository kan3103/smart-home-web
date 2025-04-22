import React, { useState, useEffect } from "react";
import { MYIP } from "../../../api/ip.js";
import axios from "axios";

const defaultAvatar = "https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg";

const Members = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            const token = localStorage.getItem("access_token");
            try {
                const response = await axios.get(`http://${MYIP}/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                setMembers(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching members:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    if (loading) {
        return (
            <div className="w-full bg-white rounded-[15px] p-4 shadow-md">
                <p className="text-center">Loading members...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full bg-white rounded-[15px] p-4 shadow-md">
                <p className="text-center text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="w-full bg-white rounded-[15px] p-4 shadow-md overflow-auto">
            <div className="flex justify-center gap-6">
                {members.length > 0 ? (
                    members.map((member, index) => (
                        <div key={member.id || index} className="flex flex-col items-center">
                            <img 
                                className="w-[45px] h-[45px] rounded-full" 
                                src={member.avatar || defaultAvatar} 
                                alt={member.username || "Member"} 
                                onError={(e) => {
                                    e.target.src = defaultAvatar;
                                }}
                            />
                            <p className="text-sm font-medium text-gray-800">{member.username || "Unknown"}</p>
                            <p className="text-xs text-gray-500">{member.level || "Guest"}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No members found</p>
                )}
            </div>
        </div>
    );
};

export default Members;


import React, {useState, useEffect} from "react";
import axios from "axios";
import Header from "../Home/component/Header";
import Add from "../../component/Home/Add";
import Form from "./component/Form";
import {MYIP} from "../../api/ip.js";

const defaultAvatar = "https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg";

const ITEMS_PER_PAGE = 4;

export const AddMember = () => {
    const [members, setMembers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteStatus, setDeleteStatus] = useState({ show: false, message: '', isError: false });

    const fetchMembers = async () => {
        setIsLoading(true);
        const token = localStorage.getItem("access_token");

        try {
            const response = await axios.get(`http://${MYIP}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setMembers(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching members:", err);
            if (err.response?.status === 401) {
                alert("Your session has expired. Please login again.");
                window.location.href = "/login?redirect=members";
            } else {
                setError("Failed to load members. Please try again later.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleDeleteMember = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        const token = localStorage.getItem("access_token");
        
        try {
            await axios.delete(`http://${MYIP}/user/delete/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            
            // Update local state to remove the deleted user
            setMembers(prev => prev.filter(member => member.id !== userId));
            
            // Show success message
            setDeleteStatus({
                show: true,
                message: "User deleted successfully!",
                isError: false
            });
            
            // Adjust current page if needed after deletion
            const newTotalPages = Math.ceil((members.length - 1) / ITEMS_PER_PAGE);
            if (currentPage > newTotalPages && newTotalPages > 0) {
                setCurrentPage(newTotalPages);
            }
            
        } catch (err) {
            console.error("Error deleting member:", err);
            
            if (err.response?.status === 401) {
                alert("Your session has expired. Please login again.");
                window.location.href = "/login?redirect=members";
            } else if (err.response?.status === 403) {
                setDeleteStatus({
                    show: true,
                    message: "Only administrators can delete users!",
                    isError: true
                });
            } else {
                setDeleteStatus({
                    show: true,
                    message: "Failed to delete user. Please try again.",
                    isError: true
                });
            }
        }
        
        // Hide the status message after 3 seconds
        setTimeout(() => {
            setDeleteStatus(prev => ({...prev, show: false}));
        }, 3000);
    };

    const totalPages = Math.ceil(members.length / ITEMS_PER_PAGE);
    const displayedMembers = members.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleAddMember = (newMember) => {
        fetchMembers();
        setShowForm(false);
    };

    const getBorderColor = (level) => {
        switch (level) {
            case 2:
                return "border-red-500"; // Admin
            case 3:
                return "border-blue-500"; // Full Access
            case 1:
                return "border-gray-500"; // User
            default:
                return "border-gray-300";
        }
    };

    const getRoleFromLevel = (level) => {
        switch (level) {
            // case 1:
            //     return "User";
            case "admin":
                return "Admin";
            // case 3:
            //     return "Full Access";
            default:
                return "Member";
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="bg-[#f3f3f3] min-h-screen flex flex-col items-center">
            <Header/>

            {/* Header + Add Button */}
            <div className="w-full max-w-6xl flex justify-between p-4">
                <h1 className="text-2xl font-semibold">Members</h1>
                <button onClick={() => setShowForm(true)}>
                    <Add />
                </button>
            </div>

            {/* Status message for delete operation */}
            {deleteStatus.show && (
                <div className={`w-full max-w-6xl mb-4 p-3 rounded-lg text-white ${deleteStatus.isError ? 'bg-red-500' : 'bg-green-500'}`}>
                    {deleteStatus.message}
                </div>
            )}

            {/* Loading state */}
            {isLoading && <div className="text-center p-4">Loading members...</div>}

            {/* Error message */}
            {error && <div className="text-red-500 text-center p-4">{error}</div>}

            {/* Grid displaying members list */}
            {!isLoading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 w-full max-w-6xl">
                    {displayedMembers.length > 0 ? (
                        displayedMembers.map((member) => (
                            <div
                                key={member.id}
                                className={`bg-white shadow-lg p-4 rounded-lg text-center flex flex-col items-center hover:scale-105 transition-transform duration-300 border-2 ${getBorderColor(member.level)} relative`}
                            >
                                {/* Trash icon in top right corner */}
                                <button
                                    onClick={() => handleDeleteMember(member.id)}
                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors duration-300"
                                    title="Delete member"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                                
                                {/* Avatar */}
                                <img
                                    src={defaultAvatar}
                                    alt={member.username}
                                    className="w-24 h-24 rounded-full mb-3 object-cover"
                                />
                                {/* Member username */}
                                <h2 className="text-lg font-bold">{member.username}</h2>
                                {/* Member role */}
                                <p className="text-gray-500">{getRoleFromLevel(member.level)}</p>
                                {/* Display DOB */}
                                <p className="text-gray-400 text-sm mt-1">DOB: {formatDate(member.dob)}</p>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-4 text-center p-4">No members found.</div>
                    )}
                </div>
            )}

            {/* Pagination Controls - Only show when form is not displayed and there are members */}
            {!showForm && members.length > 0 && (
                <div className="flex justify-center gap-2 mt-6 mb-8">
                    <button
                        className={`px-4 py-2 border rounded ${
                            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
                        }`}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        ←
                    </button>
                    <span className="px-4 py-2">
                        Page {currentPage} / {totalPages || 1}
                    </span>
                    <button
                        className={`px-4 py-2 border rounded ${
                            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
                        }`}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        →
                    </button>
                </div>
            )}

            {/* Form Modal with proper z-index and positioning */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="relative">
                        <Form onClose={() => setShowForm(false)} onAddMember={handleAddMember}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddMember;


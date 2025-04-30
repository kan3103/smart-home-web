import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MYIP } from '../../api/ip';
import LoadingOverlay from '../../component/LoadingOverlay';
import Header from '../../pages/Home/component/Header';
import login2 from "../../assets/images/loginPage/login2.png";

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('access_token');
                
                if (!token) {
                    throw new Error('No authentication token found');
                }
                
                const response = await fetch(`http://${MYIP}/user`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                
                const data = await response.json();
                
                // Get the current logged-in user's data (you may need to adjust this logic)
                const currentUser = data.find(user => user);
                setUserData(currentUser);
                
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUserData();
    }, []);

    // Function to get the role name based on level
    const getRoleFromLevel = (level) => {
        switch (level) {
            case "2":
            case 2:
                return "Administrator";
            case "3":
            case 3:
                return "Full Access User";
            case "1":
            case 1:
            default:
                return "Standard User";
        }
    };

    // Function to get a color for the level badge
    const getLevelColor = (level) => {
        switch (level) {
            case "2":
            case 2:
                return "bg-red-500";
            case "3":
            case 3:
                return "bg-blue-500";
            case "1":
            case 1:
            default:
                return "bg-gray-500";
        }
    };

    // Format date from ISO to readable format
    const formatDate = (dateString) => {
        if (!dateString) return "Not specified";
        
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (e) {
            return dateString;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {loading && <LoadingOverlay />}
            
            {/* Header with Navigation */}
            <div className="bg-[#f3f3f3] min-h-screen flex flex-col items-center ">
                <Header />

                <div className="py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow overflow-hidden rounded-lg">
                        {/* Profile header */}
                        <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                            <h2 className="text-2xl font-bold">User Profile</h2>
                            <p className="mt-1 text-sm">Personal details and account information</p>
                        </div>
                        
                        {error && (
                            <div className="px-4 py-5 sm:p-6 text-center">
                                <div className="bg-red-100 text-red-700 p-4 rounded-md">
                                    <p>Error: {error}</p>
                                    <p className="mt-2">Please try logging in again</p>
                                </div>
                            </div>
                        )}
                        
                        {!loading && !error && userData && (
                            <div className="border-t border-gray-200">
                                <div className="px-4 py-5 sm:p-6">
                                    <div className="flex flex-col md:flex-row">
                                        {/* Avatar section */}
                                        <div className="flex-shrink-0 flex flex-col items-center mb-6 md:mb-0 md:mr-8">
                                            <div className="w-40 h-40 bg-gray-300 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                                {/* Default avatar - similar to Facebook */}
                                                <div className="w-full h-full bg-gray-500 flex items-center justify-center text-white text-6xl">
                                                    {userData.username ? userData.username.charAt(0).toUpperCase() : '?'}
                                                </div>
                                            </div>
                                            <div className="mt-4 text-center">
                                                <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full text-white ${getLevelColor(userData.level)}`}>
                                                    {getRoleFromLevel(userData.level)}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* User details section */}
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                                {userData.username}
                                            </h3>
                                            
                                            <div className="mt-6 border-t border-gray-200 pt-6">
                                                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                                    <div className="sm:col-span-1">
                                                        <dt className="text-sm font-medium text-gray-500">Username</dt>
                                                        <dd className="mt-1 text-sm text-gray-900">{userData.username}</dd>
                                                    </div>
                                                    
                                                    <div className="sm:col-span-1">
                                                        <dt className="text-sm font-medium text-gray-500">User ID</dt>
                                                        <dd className="mt-1 text-sm text-gray-900">{userData.id}</dd>
                                                    </div>
                                                    
                                                    <div className="sm:col-span-1">
                                                        <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                                                        <dd className="mt-1 text-sm text-gray-900">{formatDate(userData.dob)}</dd>
                                                    </div>
                                                    
                                                    <div className="sm:col-span-1">
                                                        <dt className="text-sm font-medium text-gray-500">Access Level</dt>
                                                        <dd className="mt-1 text-sm text-gray-900">{userData.level} - {getRoleFromLevel(userData.level)}</dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Footer section with additional info */}
                                <div className="px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-200">
                                    <p className="text-sm text-gray-500">
                                        Member of Zoho Home Smart Home System
                                    </p>
                                </div>
                            </div>
                        )}
                        
                        {!loading && !userData && !error && (
                            <div className="px-4 py-5 sm:p-6 text-center">
                                <p>No user data available. Please log in again.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            </div>
            
            
        </div>
    );
};

export default ProfilePage;
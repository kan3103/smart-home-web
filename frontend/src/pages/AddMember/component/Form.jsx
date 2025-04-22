import React, {useState} from 'react';
import axios from 'axios';
import {MYIP} from '../../../api/ip.js';

const Form = ({onClose, onAddMember}) => {
    const token = localStorage.getItem("access_token");
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        dob: '',
        level: 'User'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const levelMapping = {
                'User': 1,
                'Admin': 2,
                'Full Access': 3
            };

            const apiData = {
                username: formData.username,
                password: formData.password,
                dob: formData.dob,
                level: levelMapping[formData.level] // Include level in API request
            };

            const response = await axios.post(`http://${MYIP}/user/register`, apiData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            // If successful, call the onAddMember callback
            onAddMember({
                username: formData.username,
                dob: formData.dob,
                level: levelMapping[formData.level]
            });

        } catch (err) {
            const status = err.response?.status;

            if (status === 401) {
                // Unauthorized - redirect to login
                alert("Your session has expired. Please login again.");
                window.location.href = "/login?redirect=user/register";
            } else if (status === 403) {
                // Forbidden - only admin can add members
                setError("Only administrators can add new members.");
            } else {
                // Other errors
                setError(err.response?.data?.detail || 'Registration failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[300px] bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">New member</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    placeholder="Password"
                    required
                />
                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    placeholder="Date of Birth"
                    required
                />
                <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    <option value="Full Access">Full Access</option>
                </select>
                <div className="flex space-x-2 mt-4">
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md flex-1 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gradient-to-r from-red-300 to-red-500 text-white font-bold py-2 px-4 rounded-md flex-1 hover:bg-orange-700 hover:to-red-600 transition ease-in-out duration-150"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Form;

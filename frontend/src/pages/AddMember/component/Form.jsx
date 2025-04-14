import React from 'react';
import Upload from './Upload';

const Form = () => {
    return (
        <div className="w-full max-w-[300px] bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">New member</h2>
            <form className="flex flex-col">
                <input type="text" className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Full Name" />
                <input type="email" className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Phone Number" />
                <input type="date" className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Date of Birth" />
                <select
                    className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    // value={newMember.role}
                    // onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    <option value="Full Access">Full Access</option>
                </select>
                Image
                <Upload/>
                <button type="submit" className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">Submit</button>
                <button type="cancel" className="bg-gradient-to-r from-red-300 to-red-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-orange-700 hover:to-red-600 transition ease-in-out duration-150">Cancel</button>
            </form>
        </div>
    );
}

export default Form;

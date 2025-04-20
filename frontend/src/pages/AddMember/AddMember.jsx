import React, {useState, useEffect} from "react";
import Header from "../Home/component/Header";
import Add from "../../component/Home/Add";
import Form from "./component/Form"

const defaultAvatar = "https://via.placeholder.com/100"; // Ảnh mặc định

const mockMembers = [
    {id: 1, name: "A", role: "Admin", avatar: "https://randomuser.me/api/portraits/men/1.jpg"},
    {id: 2, name: "B", role: "User", avatar: "https://randomuser.me/api/portraits/women/2.jpg"},
    {id: 3, name: "C", role: "Admin", avatar: "https://randomuser.me/api/portraits/men/3.jpg"},
    {id: 4, name: "D", role: "Full Access", avatar: "https://randomuser.me/api/portraits/women/4.jpg"},
    {id: 5, name: "E", role: "User"},
    {id: 6, name: "F", role: "User", avatar: "https://randomuser.me/api/portraits/men/6.jpg"},
    {id: 7, name: "G", role: "User"},
    {id: 8, name: "H", role: "User", avatar: "https://randomuser.me/api/portraits/women/8.jpg"},
    {id: 9, name: "I", role: "User"},
    {id: 10, name: "J", role: "User", avatar: "https://randomuser.me/api/portraits/women/10.jpg"},
    {id: 11, name: "K", role: "User"},
];

const ITEMS_PER_PAGE = 8;

export const AddMember = () => {
    const [members, setMembers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        // Giả lập fetch API từ backend
        setMembers(mockMembers);
    }, []);

    const totalPages = Math.ceil(members.length / ITEMS_PER_PAGE);
    const displayedMembers = members.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleAddMember = (newMember) => {
        setMembers([...members, {id: members.length + 1, ...newMember}]);
        setShowForm(false);
    };

    // Hàm lấy màu viền theo vai trò
    const getBorderColor = (role) => {
        switch (role) {
            case "Admin":
                return "border-red-500";
            case "Full Access":
                return "border-blue-500";
            case "User":
                return "border-gray-500";
            default:
                return "border-gray-300";
        }
    };

    return (
        <div className="bg-[#f3f3f3] min-h-screen flex flex-col items-center">
            <Header/>

            {/* Header + Nút Add */}
            <div className="w-full max-w-6xl flex justify-between p-4">
                <h1 className="text-2xl font-semibold">Members</h1>
                <button onClick={() => setShowForm(true)}>
                    <Add />
                </button>
            </div>

            {/* Grid hiển thị danh sách thành viên */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 w-full max-w-6xl">
                {displayedMembers.map((member) => (
                    <div
                        key={member.id}
                        className={`bg-white shadow-lg p-4 rounded-lg text-center flex flex-col items-center hover:scale-105 transition-transform duration-300 border-2 ${getBorderColor(member.role)}`}
                    >
                        {/* Hình đại diện */}
                        <img
                            src={member.avatar || defaultAvatar}
                            alt={member.name}
                            className="w-24 h-24 rounded-full mb-3 object-cover"
                        />
                        {/* Tên thành viên */}
                        <h2 className="text-lg font-bold">{member.name}</h2>
                        {/* Vai trò */}
                        <p className="text-gray-500">{member.role}</p>
                    </div>
                ))}
            </div>

            {/* Pagination Controls - Only show when form is not displayed */}
            {!showForm && (
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
                        Page {currentPage} / {totalPages}
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


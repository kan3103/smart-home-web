import React from "react";
import avatar1 from "../../../assets/images/home/avatar1.png";
import avatar2 from "../../../assets/images/home/avatar2.png";
import avatar3 from "../../../assets/images/home/avatar3.png";
import avatar4 from "../../../assets/images/home/avatar4.png";

const members = [
    { id: 1, name: "Member1", role: "Partial Access", avatar: avatar3 },
    { id: 2, name: "Host", role: "Admin", avatar: avatar2 },
    { id: 3, name: "Member2", role: "Partial Access", avatar: avatar4 },
    { id: 4, name: "Member3", role: "Partial Access", avatar: avatar1 },
];

const Members = () => (
    <div className="w-full bg-white rounded-[15px] p-4 shadow-md overflow-auto">
        <div className="flex justify-center gap-6">
            {members.map((member) => (
                <div key={member.id} className="flex flex-col items-center">
                    <img className="w-[45px] h-[45px] rounded-full" src={member.avatar} alt={member.name} />
                    <p className="text-sm font-medium text-gray-800">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                </div>
            ))}
        </div>
    </div>
);

export default Members;

import React from "react";
import login2 from "../../../assets/images/loginPage/login2.png";
import hostAvatar from "../../../assets/images/home/hostAvatar.png";
import Dropdown from "./Dropdown";
import Card from "../../../component/Home/Card";

const Header = () => (
    <div className="flex w-full h-[66px] items-center justify-between px-6 py-3.5 bg-white border-b border-[#0000000d]">
        {/* Logo */}
        <div className="flex items-center gap-2">
            <img className="w-[36px] h-[36px]" alt="Logo" src={login2} />
            <div className="text-[20px] font-semibold text-black">Zoho <span className="opacity-50">Home</span></div>
        </div>

        {/* Search Bar */}
        {/* <div className="flex-1 max-w-[700px] ">
            <Search />
        </div> */}
        <div className="flex" style={{ transform: "rotate(-90deg)" }}>
            <Card />
        </div>


        {/* User Info */}
        <div className="flex items-center gap-3">
            <img className="w-[36px] h-[36px]" alt="Avatar" src={hostAvatar} />
            <div className="text-base font-semibold text-[#00000066]">Host</div>
            <Dropdown/>
        </div>
    </div>
);

export default Header;
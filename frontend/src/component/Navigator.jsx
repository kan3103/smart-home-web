import React from "react";
import Card from "./Home/Card.jsx";


export const Nav = () => {
    return (
        <div className="flex flex-col h-[918px] items-center gap-[38px] pt-[30px] pb-[300px] px-[25px] relative bg-white">
            <div className= "mx-auto justify-center">
                <Card/>
            </div>
        </div>
    );
};

export default Nav;
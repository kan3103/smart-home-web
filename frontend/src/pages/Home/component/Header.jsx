import React from "react";
import login2 from "../../../assets/images/loginPage/login2.png";
import hostAvatar from "../../../assets/images/home/hostAvatar.png";

const Header = () => (
    <div
        className="flex w-[1510px] h-[66px] items-center gap-[23px] pl-6 pr-5 py-3.5 absolute top-0 left-0 bg-white border-b [border-bottom-style:solid] border-[#0000000d]">
        <div className="relative w-[141.54px] h-[27px]">
            {/*<div className="absolute w-[417px] h-[304px] top-[132px] left-[1067px] bg-white rounded-[15px]">*/}

            {/*</div>*/}
            <div className="absolute w-[106px] h-5 top-2 left-[50px]">
                <img
                    className="absolute w-[36px] h-[36px] top-[-10px] left-[-50px] "
                    alt="Logo"
                    src={login2}
                />
                <div
                    className="absolute w-[53px] top-0 left-0 [font-family:'Spartan-SemiBold',Helvetica] font-semibold text-[#000000] text-[20px] tracking-[0.15px] leading-[normal]">
                    Zoho
                </div>

                <div
                    className="absolute w-[61px] top-0 left-[55px] opacity-50 [font-family:'Spartan-SemiBold',Helvetica] font-semibold text-[#000000] text-[20px] tracking-[0.15px] leading-[normal]">
                    Home
                </div>
            </div>

            <div
                className="flex w-[496px] h-[38px] top-[-3px] left-[200px] items-center pl-3 pr-[5.13px] py-[5.13px] relative bg-system-materialssm-l-thick rounded-[6.42px] border border-solid border-[#0000001a]">
                <div className="relative w-[16px] h-[16px]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="7" cy="7" r="6" stroke="black" strokeWidth="2"/>
                        <line x1="11" y1="10" x2="15" y2="15" stroke="black" strokeWidth="2"/>
                    </svg>
                </div>
                <div
                    className="inline-flex items-start gap-2.5 pl-[7px] pr-2.5 pt-px pb-0 relative flex-[0_0_auto] opacity-80">
                    <div
                        className="relative w-fit mt-[-1.00px] [font-family:'Roboto-Medium',Helvetica] font-medium text-label-colorslc-l-secondary text-base tracking-[-0.26px] leading-[14.1px] whitespace-nowrap">
                        Search
                    </div>
                </div>
            </div>

            <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
                <img
                    className="absolute w-[36px] h-[36px] top-[-45px] left-[1200px]"
                    alt="Avatar"
                    src={hostAvatar}
                />
                <div
                    className="relative w-[167px] h-[23px] top-[-35px] left-[1250px] [font-family:'Lato-SemiBold',Helvetica] font-semibold text-[#00000066] text-base tracking-[0] leading-[normal]">
                    Host
                </div>
                <svg className="!relative !w-6 !h-6 top-[-39px] left-[1230px]" viewBox="0 0 24 24">
                    <circle cx="12" cy="5" r="2"/>
                    <circle cx="12" cy="12" r="2"/>
                    <circle cx="12" cy="19" r="2"/>
                </svg>
            </div>
        </div>
    </div>
);

export default Header;
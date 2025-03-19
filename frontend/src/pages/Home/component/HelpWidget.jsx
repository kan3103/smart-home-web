import theme from "../../../assets/images/home/theme.png";
import repair from "../../../assets/images/icon/repair.png";
import {React} from "react";

const HelpWidget = () => (
    <div className="absolute w-56 h-[200px] top-[230px] left-[670px]">
        <div className="relative w-[300px] h-[263px] top-[-7px] left-[-27px] bg-[100%_100%]">
            <img
                className="absolute w-[290px] h-[200px] top-[35px] left-[0px]"
                alt="Theme"
                src={theme}
            />
            <div className="absolute top-[80px] left-[60px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-white text-[22px] tracking-[-0.44px] leading-[normal] whitespace-nowrap">
                Need help?
            </div>

            <p className="absolute top-[115px] left-[60px] opacity-80 [font-family:'Roboto-Regular',Helvetica] font-normal text-white text-sm tracking-[-0.39px] leading-[normal]">
                Contact our highly trained
                <br />
                personal for help
            </p>

            <div className="absolute w-44 h-[37px] top-[170px] left-[57px] bg-white rounded-lg shadow-[0px_2px_4px_-1px_#00000012,0px_4px_7px_-1px_#0000001c]">
                <div className="absolute top-[11px] left-[43px] opacity-80 [font-family:'Roboto-Bold',Helvetica] font-bold text-[#252f40] text-[13px] text-center tracking-[-0.33px] leading-[normal] whitespace-nowrap">
                    Contact Host
                </div>
            </div>

            <div className="absolute w-9 h-9 top-[55px] left-[210px]">
                <div className="relative h-9">
                    <div className="absolute w-9 h-9 top-0 left-0">
                        <div className="relative w-[38px] h-[38px] -top-px -left-px bg-white rounded-md shadow-[0px_2px_4px_-1px_#00000012,0px_4px_6px_-1px_#0000001f]">
                        </div>
                    </div>

                    <img
                        className="absolute w-[22px] h-[22px] top-[7px] left-[7px] object-cover"
                        alt="Repair tool"
                        src={repair}
                    />
                </div>
            </div>
        </div>
    </div>
);

export default HelpWidget;
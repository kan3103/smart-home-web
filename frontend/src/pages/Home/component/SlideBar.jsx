import home1 from "../../../assets/images/home/home1.png";
import lock from "../../../assets/images/icon/lock.png";
import unlock from "../../../assets/images/icon/unlock.png";
import {React} from "react";

const SlideBar = () => (
    <div className="absolute w-[906px] h-[200px] top-[-15px] left-[-5px] bg-white rounded-[15px]">
        <div className="absolute top-6 left-[25px] [font-family:'Roboto-Bold',Helvetica] font-bold text-[#000000] text-[22px] tracking-[0.22px] leading-[normal] whitespace-nowrap">
            Hello, Host!
        </div>

        <p className="absolute top-[62px] left-[25px] opacity-40 [font-family:'Roboto-Medium',Helvetica] font-medium text-[#000000] text-sm tracking-[0.14px] leading-[normal] whitespace-nowrap">
            Welcome home, air quality is good and Fresh. Take a walk and have
            coffee.
        </p>

        <img
            className="absolute w-[197px] h-[156px] top-[26px] left-[625px]"
            alt="Tech life"
            src={home1}
        />


        <div className="absolute top-[107px] left-[51px] opacity-50 [font-family:'Roboto-Bold',Helvetica] font-bold text-[#000000] text-sm tracking-[0.14px] leading-[normal] whitespace-nowrap">
            Your Door is locked!
        </div>

        <div className="flex w-[180px] h-[39px] items-center justify-center gap-1.5 absolute top-[140px] left-[25px] rounded-lg border-2 border-solid border-[#0000004c]">

            <img
                className="relative w-4 h-4"
                alt="Mask group"
                src={lock}
            />

            <div className="inline-flex items-start gap-2.5 pt-3.5 pb-2.5 px-0 relative flex-[0_0_auto]">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Roboto-Bold',Helvetica] font-bold text-[#999999] text-xs tracking-[0] leading-[normal] whitespace-nowrap">
                    Locked
                </div>
            </div>
        </div>

        <div className="flex w-[180px] h-[39px] items-center justify-center gap-1.5 absolute top-[140px] left-[220px] bg-[#6b6bf9] rounded-lg">
            <img
                className="relative w-4 h-[17px]"
                alt="Mask group"
                src= {unlock}
            />
            <div className="relative w-4 h-[17px] bg-[100%_100%]" />
            <div className="inline-flex items-start gap-2.5 pt-3.5 pb-2.5 px-0 relative flex-[0_0_auto]">
                <div className="mt-[-1.00px] relative w-fit [font-family:'Roboto-Bold',Helvetica] font-bold text-white text-xs tracking-[0] leading-[normal] whitespace-nowrap">
                    Unlock
                </div>
            </div>
        </div>

        <div className="absolute w-[15px] h-[21px] top-[106px] left-[26px]">
            <div className="relative w-[17px] h-[23px] -top-px -left-px">
                <div className="absolute w-[17px] h-[21px] top-0 left-0 bg-white border-[1.7px] border-solid border-[#808080]" />

                <div className="absolute w-[3px] h-[3px] top-2.5 left-[7px] bg-[#808080] rounded-[1.5px]" />
            </div>
        </div>
    </div>
);
export default SlideBar;

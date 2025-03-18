import {React} from "react";

const Camera = () => (
    <div className="absolute w-[688px] h-[234px] top-[600px] left-[0px] bg-white rounded-[15px]">
        <div className="absolute w-[196px] h-[130px] top-[58px] left-[472px] bg-cover bg-[50%_50%]">
            <div className="absolute w-[196px] h-[130px] top-0 left-0 rounded-[15px] [background:linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0)_100%)]" />

            <div className="top-2.5 left-[124px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-white text-xs text-center absolute tracking-[0.24px] leading-[normal] whitespace-nowrap">
                Camera 3
            </div>

            <div className="absolute w-2 h-[9px] top-[13px] left-28 bg-[#f44b4b] rounded-[4px/4.5px]" />
        </div>

        <div className="absolute top-[195px] left-[512px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-[#555558] text-sm text-center tracking-[0.28px] leading-[normal] whitespace-nowrap">
            Master BedRoom
        </div>

        <div className="absolute w-[196px] h-[130px] top-[58px] left-5  bg-cover bg-[50%_50%]">
            <div className="absolute w-[196px] h-[130px] top-0 left-0 rounded-[15px] [background:linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0)_100%)]" />

            <div className="top-2.5 left-[125px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-white text-xs text-center absolute tracking-[0.24px] leading-[normal] whitespace-nowrap">
                Camera 1
            </div>

            <div className="absolute w-2.5 h-[9px] top-[13px] left-28 bg-[#f44b4b] rounded-[5px/4.5px]" />
        </div>

        <div className="absolute w-[198px] h-[130px] top-[58px] left-[245px] bg-cover bg-[50%_50%]">
            <div className="absolute w-[198px] h-[130px] top-0 left-0 bg-[#000000] rounded-[15px] opacity-60" />

            <div className="top-2.5 left-[126px] opacity-40 [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-white text-xs text-center absolute tracking-[0.24px] leading-[normal] whitespace-nowrap">
                Camera 2
            </div>

            <div className="absolute w-[9px] h-[9px] top-[13px] left-[113px] bg-[#adafb0] rounded-[4.5px]" />
        </div>

        <div className="top-[19px] left-5 [font-family:'Roboto-Bold',Helvetica] font-bold text-[#000000] text-2xl absolute tracking-[0.24px] leading-[normal] whitespace-nowrap">
            Camera
        </div>

        <div className="absolute top-[195px] left-[77px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-[#555558] text-sm text-center tracking-[0.28px] leading-[normal] whitespace-nowrap">
            Living Room
        </div>

        <div className="absolute top-[195px] left-[317px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-[#555558] text-sm text-center tracking-[0.28px] leading-[normal] whitespace-nowrap">
            Kitchen
        </div>
    </div>
);

export default Camera;
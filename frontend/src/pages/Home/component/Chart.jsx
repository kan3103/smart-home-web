import {React} from "react";

const Chart = () => (
    <div className="absolute w-[342px] h-[174px] top-[41px] left-[53px]">
        <img
            className="absolute w-[339px] h-[174px] top-0 left-px"
            alt="Group"

        />

        <img
            className="absolute w-[342px] h-[164px] top-2.5 left-0"
            alt="Group"

        />

        <img
            className="absolute w-px h-[108px] top-[66px] left-[174px] object-cover"
            alt="Vector"

        />

        <div className="absolute w-[61px] h-[35px] top-7 left-[145px] shadow-[0px_0px_4px_#0000001f]">
            <div className="relative w-[67px] h-10 -top-1 -left-1">
                <img
                    className="absolute w-3 h-[3px] top-[35px] left-7"
                    alt="Vector"

                />

                <img
                    className="absolute w-[67px] h-10 top-0 left-0"
                    alt="Rectangle"

                />

                <div className="absolute h-3.5 top-[13px] left-3 [font-family:'Roboto-Medium',Helvetica] font-medium text-[#6b6bf9] text-[11px] text-center tracking-[0.11px] leading-[14px] whitespace-nowrap">
                    340KWh
                </div>
            </div>
        </div>

        <div className="absolute w-3 h-3 top-[66px] left-[169px] bg-white rounded-[5.99px/6px] border-2 border-solid border-[#6b6bf9]" />
    </div>
);
export default Chart;
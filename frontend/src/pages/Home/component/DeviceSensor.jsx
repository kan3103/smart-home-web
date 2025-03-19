import temp from "../../../assets/images/icon/temp.png";
import ChangeUnit from "../../../component/Home/ChangeUnit";
import humid from "../../../assets/images/icon/humid.png";
import {React} from "react";

const DeviceSensor = () => (
    <div className="absolute w-[650px] h-[250px] top-[215px] left-0 bg-gradient-to-b from-sky-500  rounded-[15px]">

        <img
            className="absolute w-[78px] h-[78px] top-[40px] left-[165px]"
            alt="Mask group"
            src={temp}
        />

        <div className="left-[175px] absolute top-[165px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-black text-3xl tracking-[0.18px] leading-[normal] whitespace-nowrap">
            60°F
        </div>

        <div className="left-[155px] absolute top-[130px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-[#ff0000] text-base tracking-[0.16px] leading-[normal] whitespace-nowrap">
            Temperature
        </div>

        <div className="absolute left-[-30px] top-[-30px]" >
            <ChangeUnit alt="SwitchTog" property1="variant-2"/>
        </div>

        <img
            className="absolute w-[78px] h-[78px] top-[40px] left-[390px] "
            alt="Mask group"
            src={humid}
        />

        <div className="left-[400px] absolute top-[165px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-black text-3xl tracking-[0.16px] leading-[normal] whitespace-nowrap">
            75%
        </div>

        <div className="left-[392px] absolute top-[130px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-[#6b6bf9] text-base tracking-[0.16px] leading-[normal] whitespace-nowrap">
            Humidity
        </div>

    </div>
);
export default DeviceSensor;
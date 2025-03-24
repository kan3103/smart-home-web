import temp from "../../../assets/images/icon/temp.png";
import ChangeUnit from "../../../component/Home/ChangeUnit";
import humid from "../../../assets/images/icon/humid.png";
import { React, useState, useEffect } from "react";
import Home_Temp from "../../../hooks/webSocket";

const DisplayInfo = () => {
    const [temperature, humidity] = Home_Temp();
    return { temperature, humidity };
};

const DeviceSensor = () => {
    const { temperature, humidity } = DisplayInfo();
    const [isCelsius, setIsCelsius] = useState(true);
    const [displayTemp, setDisplayTemp] = useState(temperature);

    useEffect(() => {
        const convertedTemp = isCelsius
            ? ((temperature - 32) * 5) / 9
            : (temperature * 9) / 5 + 32;
        setDisplayTemp(convertedTemp.toFixed(1));
    }, [isCelsius, temperature]);

    const handleUnitChange = () => setIsCelsius(!isCelsius);

    return (
        <div className="absolute w-[650px] h-[250px] top-[215px] left-0 bg-gradient-to-b from-sky-500 rounded-[15px] transition-all duration-500">
            <img
                className="absolute w-[78px] h-[78px] top-[40px] left-[165px]"
                alt="Temperature Icon"
                src={temp}
            />

            <div className="left-[160px] absolute top-[165px] font-semibold text-black text-3xl tracking-[0.18px] leading-[normal] whitespace-nowrap transition-all duration-500">
                {displayTemp}°{isCelsius ? "C" : "F"}
            </div>

            <div className="left-[155px] absolute top-[130px] font-semibold text-[#ff0000] text-base tracking-[0.16px] leading-[normal] whitespace-nowrap">
                Temperature
            </div>

            <div className="absolute left-[-30px] top-[-30px]" onClick={handleUnitChange}>
                <ChangeUnit alt="SwitchTog" property1="variant-2" isCelsius={isCelsius} />
            </div>

            <img
                className="absolute w-[78px] h-[78px] top-[40px] left-[390px]"
                alt="Humidity Icon"
                src={humid}
            />

            <div className="left-[405px] absolute top-[165px] font-semibold text-black text-3xl tracking-[0.16px] leading-[normal] whitespace-nowrap">
                {humidity}%
            </div>

            <div className="left-[392px] absolute top-[130px] font-semibold text-[#6b6bf9] text-base tracking-[0.16px] leading-[normal] whitespace-nowrap">
                Humidity
            </div>
        </div>
    );
};

export default DeviceSensor;

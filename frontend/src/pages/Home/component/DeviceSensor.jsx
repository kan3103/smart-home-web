import React, { useState, useMemo } from "react";
import ChangeUnit from "../../../component/Home/ChangeUnit";
import Home_Temp from "../../../hooks/webSocket";
import tempIcon from "../../../assets/images/icon/temp.png";
import humidIcon from "../../../assets/images/icon/humid.png";

const DeviceSensor = () => {
    const [temperature, humidity] = Home_Temp();
    const [isCelsius, setIsCelsius] = useState(true);

    const displayTemp = useMemo(() => 
        isCelsius ? temperature : (temperature * 9) / 5 + 32, 
        [isCelsius, temperature]
    );

    const handleUnitChange = () => setIsCelsius(!isCelsius);

    const sensors = [
        { id: 1, name: "Temperature", value: `${displayTemp}°${isCelsius ? "C" : "F"}`, color: "#ff0000", icon: tempIcon },
        { id: 2, name: "Humidity", value: `${humidity}%`, color: "#6b6bf9", icon: humidIcon },
    ];

    return (
        <div className="relative w-full bg-gradient-to-b from-sky-500 rounded-[15px] p-4 shadow-md flex flex-wrap justify-around items-center">
            <div className="absolute top-0 left-0 p-2 flex items-center w-auto min-w-[50px] max-w-[150px]">
                <div onClick={handleUnitChange} className="cursor-pointer w-full">
                    <ChangeUnit alt="SwitchTog" property1="variant-2" isCelsius={isCelsius} />
                </div>
            </div>
            {sensors.map(({ id, name, value, color, icon }) => (
                <div key={id} className="flex flex-col items-center gap-2 w-1/3 min-w-[80px] max-w-[120px] text-center">
                    <img className="w-2/4 h-auto max-w-[64px] sm:max-w-[78px]" src={icon} alt={name} />
                    <p className="text-xs sm:text-base font-semibold" style={{ color }}>{name}</p>
                    <p className="text-lg sm:text-3xl font-semibold text-black">{value}</p>
                </div>
            ))}
        </div>
    );
};

export default DeviceSensor;
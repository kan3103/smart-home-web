import {React, useEffect} from 'react';
import weatherMapAPI from "../../api/weatherMapAPI";

const Weather = () => {
    const weatherData = weatherMapAPI();

    useEffect(() => {
        const updateClock = () => {
            const clockElement = document.getElementById('clock');
            if (clockElement) {
                clockElement.innerText = new Date().toLocaleTimeString();
            }
        };
        updateClock();
        const intervalId = setInterval(updateClock, 1000);
        return () => clearInterval(intervalId);
    }, []);

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    let temperatureC = ((weatherData.temperature - 32) * 5 / 9).toFixed(1);

    return (
        <div className="group relative w-50">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-sky-500 to-indigo-500 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-sky-500/25">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23ffffff%22%20stroke-width%3D%221%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M20%2016.2A4.5%204.5%200%200017.5%208h-1.8A7%207%200%104%2014.9%22%2F%3E%3Cpath%20d%3D%22M12%2012v9%22%2F%3E%3Cpath%20d%3D%22M8%2017l4%204%22%2F%3E%3Cpath%20d%3D%22M16%2017l-4%204%22%2F%3E%3C%2Fsvg%3E')] bg-center opacity-5" />
                <div className="relative p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-white">{weatherData.district}</h3>
                            <p className="text-sm text-white/80">{weatherData.city}, {weatherData.country}</p>
                        </div>
                        <span className="text-sm text-white/80" id= "clock"> </span>
                    </div>
                    <div className="mt-8 grid grid-cols-2 gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-1">
                            <svg className="h-6 w-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                            </svg>
                            <span className="text-sm font-medium text-white">Temperature</span>
                            <span className="text-lg font-semibold text-white"> {temperatureC}°C </span>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                            <svg className="h-6 w-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                            <span className="text-sm font-medium text-white">Humidity</span>
                            <span className="text-lg font-semibold text-white">{weatherData.humidity}%</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;

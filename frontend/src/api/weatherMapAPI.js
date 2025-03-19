import { useEffect, useState } from "react";

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const WEATHER_API_KEY = "e19ba1ab679e5381fb37552c094a4767";
    const NOMINATIM_URL = "https://nominatim.openstreetmap.org/reverse?format=json";

    useEffect(() => {
        const fetchWeatherAndLocation = async (latitude, longitude) => {
            try {
                const weatherResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=imperial`
                );
                const weatherData = await weatherResponse.json();

                const locationResponse = await fetch(
                    `${NOMINATIM_URL}&lat=${latitude}&lon=${longitude}`
                );
                const locationData = await locationResponse.json();

                const address = locationData.address;

                setWeatherData({
                    temperature: Math.round(weatherData.main.temp),
                    humidity: weatherData.main.humidity,
                    district: address.county || address.suburb || "Unknown district",
                    city: address.city || address.town || address.village || "Unknown city",
                    country: address.country || "Unknown country",
                });
            } catch (error) {
                console.error("Failed to fetch weather or location data:", error);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherAndLocation(latitude, longitude);
            });
        }
    }, []);

    return weatherData;
};

export default Weather;

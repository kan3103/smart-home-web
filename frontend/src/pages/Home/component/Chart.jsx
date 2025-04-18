import React, {useState, useEffect} from "react";
import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import Home_Temp from "../../../hooks/webSocket";
import weatherMapAPI from "../../../api/weatherMapAPI";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Chart = () => {
    const [temperature, humidity] = Home_Temp();
    const weatherData = weatherMapAPI();
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [chartDataHumidity, setChartDataHumidity] = useState({
        labels: [],
        datasets: [],
    });

    // Setup options for the charts
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Temperature (°C)",
            },
        },
        scales: {
            y: {
                min: 15,
                max: 40,
            },
        },
    };

    const humidityOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Humidity (%)",
            },
        },
        scales: {
            y: {
                min: 0,
                max: 100,
            },
        },
    };

    useEffect(() => {
        const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

        const outsideTemp = weatherData ? ((weatherData.temperature - 32) * 5 / 9).toFixed(1) : null;
        const outsideHumidity = weatherData ? weatherData.humidity : null;

        if (temperature !== undefined) {
            setChartData(prevData => {
                const newLabels = [...prevData.labels, currentTime];
                const indoorTemp = [...(prevData.datasets[0]?.data || []), temperature];
                const outdoorTemp = [...(prevData.datasets[1]?.data || []), outsideTemp];

                const labels = newLabels.slice(-10);
                const indoorData = indoorTemp.slice(-10);
                const outdoorData = outdoorTemp.slice(-10);

                return {
                    labels,
                    datasets: [
                        {
                            label: "Indoor Temperature",
                            data: indoorData,
                            borderColor: "rgb(75, 192, 192)",
                            backgroundColor: "rgba(75, 192, 192, 0.5)",
                        },
                        {
                            label: "Outdoor Temperature",
                            data: outdoorData,
                            borderColor: "rgb(255, 99, 132)",
                            backgroundColor: "rgba(255, 99, 132, 0.5)",
                        },
                    ],
                };
            });
        }

        if (humidity !== undefined) {
            setChartDataHumidity(prevData => {
                const newLabels = [...prevData.labels, currentTime];
                const indoorHumidity = [...(prevData.datasets[0]?.data || []), humidity];
                const outdoorHumidity = [...(prevData.datasets[1]?.data || []), outsideHumidity];

                // Keep only the last 10 data points
                const labels = newLabels.slice(-10);
                const indoorData = indoorHumidity.slice(-10);
                const outdoorData = outdoorHumidity.slice(-10);

                return {
                    labels,
                    datasets: [
                        {
                            label: "Indoor Humidity",
                            data: indoorData,
                            borderColor: "rgb(53, 162, 235)",
                            backgroundColor: "rgba(53, 162, 235, 0.5)",
                        },
                        {
                            label: "Outdoor Humidity",
                            data: outdoorData,
                            borderColor: "rgb(153, 102, 255)",
                            backgroundColor: "rgba(153, 102, 255, 0.5)",
                        },
                    ],
                };
            });
        }
    }, [temperature, humidity, weatherData]);

    return (
        <div className="bg-white rounded-2xl shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2 ">Environment Trends</h2>
            <div className="grid grid-cols-1 gap-4">
                <div className="h-48">
                    {chartData.datasets.length > 0 && <Line options={options} data={chartData}/>}
                </div>
                <div className="h-48">
                    {chartDataHumidity.datasets.length > 0 &&
                        <Line options={humidityOptions} data={chartDataHumidity}/>}
                </div>
            </div>
        </div>
    );
};

export default Chart;

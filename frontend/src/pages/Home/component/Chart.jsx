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
    const [lastUpdateTime, setLastUpdateTime] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                position: "top",
                labels: {
                    usePointStyle: false,
                    boxWidth: 6,
                    font: {
                        size: 12,
                    }
                },
            },
            title: {
                display: true,
                text: "Temperature (°C)",
                font: {
                    size: 16,
                    weight: 'bold',
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#333',
                bodyColor: '#666',
                borderColor: '#ddd',
                borderWidth: 1,
                padding: 10,
                displayColors: true,
                usePointStyle: true,
            }
        },
        scales: {
            y: {
                min: 15,
                max: 40,
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)',
                },
                ticks: {
                    font: {
                        size: 11,
                    },
                }
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 10,
                    },
                    maxRotation: 45,
                    minRotation: 45,
                }
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuad',
        },
    };

    const humidityOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                position: "top",
                labels: {
                    usePointStyle: false,
                    boxWidth: 6,
                    font: {
                        size: 12,
                    }
                },
            },
            title: {
                display: true,
                text: "Humidity (%)",
                font: {
                    size: 16,
                    weight: 'bold',
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#333',
                bodyColor: '#666',
                borderColor: '#ddd',
                borderWidth: 1,
                padding: 10,
                displayColors: true,
                usePointStyle: true,
            }
        },
        scales: {
            y: {
                min: 0,
                max: 100,
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)',
                },
                ticks: {
                    font: {
                        size: 7,
                    }
                }
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 10,
                    },
                    maxRotation: 45,
                    minRotation: 45,
                }
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuad',
        },
    };

    useEffect(() => {
        // Only update the charts when both indoor data and outdoor data are available
        if (temperature !== undefined && weatherData) {
            setIsLoading(false);
            // Create a consistent timestamp for both data sources
            const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

            // Calculate temperature in Celsius
            const outsideTemp = ((weatherData.temperature - 32) * 5 / 9).toFixed(1);
            const outsideHumidity = weatherData.humidity;

            // Only update if we have new data or this is the first update
            if (lastUpdateTime !== currentTime) {
                setLastUpdateTime(currentTime);

                // Update temperature chart
                setChartData(prevData => {
                    const newLabels = [...prevData.labels, currentTime];
                    const indoorTemp = [...(prevData.datasets[0]?.data || []), temperature];
                    const outdoorTemp = [...(prevData.datasets[1]?.data || []), outsideTemp];

                    const labels = newLabels.slice(-5);
                    const indoorData = indoorTemp.slice(-5);
                    const outdoorData = outdoorTemp.slice(-5);

                    return {
                        labels,
                        datasets: [
                            {
                                label: "Indoor Temperature",
                                data: indoorData,
                                borderColor: "rgb(75, 192, 192)",
                                backgroundColor: "rgba(75, 192, 192, 0.5)",
                                borderWidth: 2,
                                pointRadius: 3,
                                pointHoverRadius: 5,
                                tension: 0.3,
                            },
                            {
                                label: "Outdoor Temperature",
                                data: outdoorData,
                                borderColor: "rgb(255, 99, 132)",
                                backgroundColor: "rgba(255, 99, 132, 0.5)",
                                borderWidth: 2,
                                pointRadius: 3,
                                pointHoverRadius: 5,
                                tension: 0.3,
                            },
                        ],
                    };
                });

                setChartDataHumidity(prevData => {
                    const newLabels = [...prevData.labels, currentTime];
                    const indoorHumidity = [...(prevData.datasets[0]?.data || []), humidity];
                    const outdoorHumidity = [...(prevData.datasets[1]?.data || []), outsideHumidity];

                    const labels = newLabels.slice(-5);
                    const indoorData = indoorHumidity.slice(-5);
                    const outdoorData = outdoorHumidity.slice(-5);

                    return {
                        labels,
                        datasets: [
                            {
                                label: "Indoor Humidity",
                                data: indoorData,
                                borderColor: "rgb(53, 162, 235)",
                                backgroundColor: "rgba(53, 162, 235, 0.5)",
                                borderWidth: 2,
                                pointRadius: 3,
                                pointHoverRadius: 5,
                                tension: 0.3,
                            },
                            {
                                label: "Outdoor Humidity",
                                data: outdoorData,
                                borderColor: "rgb(153, 102, 255)",
                                backgroundColor: "rgba(153, 102, 255, 0.5)",
                                borderWidth: 2,
                                pointRadius: 3,
                                pointHoverRadius: 5,
                                tension: 0.3,
                            },
                        ],
                    };
                });
            }
        }
    }, [temperature, humidity, weatherData, lastUpdateTime]);

    return (
        <div className="bg-white rounded-2xl shadow-lg p-5 transition-all duration-300 hover:shadow-xl">
            {isLoading ? (
                <div className="flex items-center justify-center h-96">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
                        <div className="h-40 w-full bg-gray-100 rounded"></div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-xl p-3 shadow-sm h-64 md:h-72">
                        {chartData.datasets.length > 0 && <Line options={options} data={chartData}/>}
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 shadow-sm h-64 md:h-72">
                        {chartDataHumidity.datasets.length > 0 &&
                            <Line options={humidityOptions} data={chartDataHumidity}/>}
                    </div>
                </div>
            )}

            <div className="text-xs text-gray-500 mt-4 text-right">
                {lastUpdateTime && `Last updated: ${lastUpdateTime}`}
            </div>
        </div>
    );
};

export default Chart;

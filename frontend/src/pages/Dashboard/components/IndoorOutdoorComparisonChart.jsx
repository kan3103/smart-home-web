import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  LineChart,
  ComposedChart
} from "recharts";
import Home_Temp from "../../../hooks/webSocket";
import Weather from "../../../api/weatherMapAPI";

const CustomTooltip = ({ active, payload, label, dataKey }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
        <p className="font-semibold">{`Time: ${payload[0].payload.time}`}</p>
        {dataKey === "temperature" && (
          <>
            <p className="text-[#ff7300]">{`Indoor: ${payload[0].payload.indoor}°C`}</p>
            <p className="text-[#0088fe]">{`Outdoor: ${payload[0].payload.outdoor}°C`}</p>
            <p>{`Difference: ${Math.abs(payload[0].payload.indoor - payload[0].payload.outdoor).toFixed(1)}°C`}</p>
          </>
        )}
        {dataKey === "humidity" && (
          <>
            <p className="text-[#82ca9d]">{`Indoor: ${payload[0].payload.indoorHumidity}%`}</p>
            <p className="text-[#8884d8]">{`Outdoor: ${payload[0].payload.outdoorHumidity}%`}</p>
            <p>{`Difference: ${Math.abs(payload[0].payload.indoorHumidity - payload[0].payload.outdoorHumidity).toFixed(1)}%`}</p>
          </>
        )}
      </div>
    );
  }
  return null;
};

const IndoorOutdoorComparisonChart = () => {
  const [indoorTemp, indoorHumidity] = Home_Temp();
  const weatherData = Weather();
  const [chartData, setChartData] = useState([]);
  const [activeChart, setActiveChart] = useState("temperature"); // "temperature" or "humidity"

  useEffect(() => {
    if (indoorTemp !== null && weatherData && weatherData.temperature !== null) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      // Convert outdoor temperature from Fahrenheit to Celsius
      const outdoorTempCelsius = (weatherData.temperature - 32) * 5/9;
      
      setChartData(prevData => {
        // Keep only the last 10 data points
        const newData = [
          ...prevData, 
          { 
            time: timeStr, 
            indoor: parseFloat(indoorTemp).toFixed(1), 
            outdoor: parseFloat(outdoorTempCelsius).toFixed(1),
            indoorHumidity: parseFloat(indoorHumidity).toFixed(1),
            outdoorHumidity: weatherData.humidity ? parseFloat(weatherData.humidity).toFixed(1) : null
          }
        ];
        if (newData.length > 10) {
          return newData.slice(newData.length - 10);
        }
        return newData;
      });
    }
  }, [indoorTemp, indoorHumidity, weatherData]);

  const toggleChart = () => {
    setActiveChart(activeChart === "temperature" ? "humidity" : "temperature");
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={toggleChart} 
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Show {activeChart === "temperature" ? "Humidity" : "Temperature"}
        </button>
      </div>
      
      <ResponsiveContainer width="100%" height="90%">
        {activeChart === "temperature" ? (
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 25,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 40]} label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
            <Tooltip content={<CustomTooltip dataKey="temperature" />} />
            <Legend />
            <Bar dataKey="indoor" name="Indoor Temp (°C)" fill="#ff7300" />
            <Bar dataKey="outdoor" name="Outdoor Temp (°C)" fill="#0088fe" />
          </BarChart>
        ) : (
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 25,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} label={{ value: 'Humidity (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip content={<CustomTooltip dataKey="humidity" />} />
            <Legend />
            <Bar dataKey="indoorHumidity" name="Indoor Humidity (%)" fill="#82ca9d" />
            <Bar dataKey="outdoorHumidity" name="Outdoor Humidity (%)" fill="#8884d8" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default IndoorOutdoorComparisonChart;

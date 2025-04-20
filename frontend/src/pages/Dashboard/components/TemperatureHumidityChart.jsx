import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Home_Temp from "../../../hooks/webSocket";

const TemperatureHumidityChart = () => {
  const [temperature, humidity] = Home_Temp();
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    // Add data points with timestamps
    if (temperature !== null && humidity !== null) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      setChartData(prevData => {
        // Keep only the last 20 data points to prevent chart overcrowding
        const newData = [...prevData, { time: timeStr, temperature, humidity }];
        if (newData.length > 20) {
          return newData.slice(newData.length - 20);
        }
        return newData;
      });
    }
  }, [temperature, humidity]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis yAxisId="left" domain={[0, 50]} />
        <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="temperature"
          stroke="#ff0000"
          activeDot={{ r: 8 }}
          name="Temperature (°C)"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="humidity"
          stroke="#6b6bf9"
          name="Humidity (%)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TemperatureHumidityChart;

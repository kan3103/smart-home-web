import React from "react";
import Header from "../Home/component/Header";
import TemperatureHumidityChart from "./components/TemperatureHumidityChart";
import IndoorOutdoorComparisonChart from "./components/IndoorOutdoorComparisonChart";

const DashboardPage = () => {
  return (
    <div className="bg-[#f3f3f3] min-h-screen flex flex-col items-center">
      <Header />
      <div className="w-full max-w-7xl p-4 mt-4">
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Temperature & Humidity Trends</h2>
            <div className="h-[400px]">
              <TemperatureHumidityChart />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Indoor vs Outdoor Temperature</h2>
            <div className="h-[400px]">
              <IndoorOutdoorComparisonChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

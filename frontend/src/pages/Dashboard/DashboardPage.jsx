import React, { useState } from "react";
import Header from "../Home/component/Header";
import TemperatureHumidityChart from "./components/TemperatureHumidityChart";
import IndoorOutdoorComparisonChart from "./components/IndoorOutdoorComparisonChart";
import EntryExitChartsContainer from "./components/EntryExitChartsContainer";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("temperature"); // "temperature" or "entryExit"

  return (
    <div className="bg-[#f3f3f3] min-h-screen flex flex-col items-center">
      <Header />
      <div className="w-full max-w-7xl p-4 mt-4">
        {/* Tab Selector */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex">
            <button
              className={`py-3 px-6 text-lg font-medium rounded-tl-lg focus:outline-none ${
                activeTab === "temperature"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("temperature")}
            >
              Temperature Analytics
            </button>
            <button
              className={`py-3 px-6 text-lg font-medium rounded-tr-lg focus:outline-none ${
                activeTab === "entryExit"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("entryExit")}
            >
              Entry/Exit Analytics
            </button>
          </div>
        </div>

        {/* Content based on selected tab */}
        {activeTab === "temperature" ? (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Temperature & Humidity Trends</h2>
              <div className="h-[400px]">
                <TemperatureHumidityChart />
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Indoor vs Outdoor</h2>
              <div className="h-[400px]">
                <IndoorOutdoorComparisonChart />
              </div>
            </div>
          </div>
        ) : (
          <EntryExitChartsContainer />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;

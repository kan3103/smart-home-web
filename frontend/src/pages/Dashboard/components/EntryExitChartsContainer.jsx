import React, { useState, useEffect } from "react";
import axios from "axios";
import { MYIP } from "../../../api/ip"; // Adjust the import path as necessary
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

const EntryExitChartsContainer = () => {
  const [accessData, setAccessData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Processed data for each chart
  const [combinedData, setCombinedData] = useState([]);
  const [strangersData, setStrangersData] = useState([]);
  const [acquaintancesData, setAcquaintancesData] = useState([]);

  useEffect(() => {
    const fetchAccessRecords = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://${MYIP}/access`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        
        // Store raw data
        const records = response.data;
        setAccessData(records);
        
        // Process data for all three charts
        const processedCombined = processCombinedData(records);
        const processedStrangers = processStrangersData(records);
        const processedAcquaintances = processAcquaintancesData(records);
        
        setCombinedData(processedCombined);
        setStrangersData(processedStrangers);
        setAcquaintancesData(processedAcquaintances);
        
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch access records:", err);
        setError("Failed to load entry/exit data");
        setLoading(false);
      }
    };

    fetchAccessRecords();
  }, []);

  // Process data for the combined chart (both strangers and acquaintances)
  const processCombinedData = (records) => {
    const groupedByDate = records.reduce((acc, record) => {
      const date = new Date(record.timestamp).toLocaleDateString();
      
      if (!acc[date]) {
        acc[date] = {
          date,
          strangers: 0,
          acquaintances: 0
        };
      }
      
      if (record.dangerous) {
        acc[date].strangers += 1;
      } else {
        acc[date].acquaintances += 1;
      }
      
      return acc;
    }, {});
    
    // Convert to array and sort by date
    return Object.values(groupedByDate).sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
  };

  // Process data for strangers chart
  const processStrangersData = (records) => {
    // Filter only strangers (dangerous = true)
    const strangerRecords = records.filter(record => record.dangerous);
    
    // Group by date
    const groupedByDate = strangerRecords.reduce((acc, record) => {
      const date = new Date(record.timestamp).toLocaleDateString();
      
      if (!acc[date]) {
        acc[date] = {
          date,
          count: 0
        };
      }
      
      acc[date].count += 1;
      return acc;
    }, {});
    
    // Convert to array and sort by date
    return Object.values(groupedByDate).sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
  };

  // Process data for acquaintances chart
  const processAcquaintancesData = (records) => {
    // Filter only acquaintances (dangerous = false)
    const acquaintanceRecords = records.filter(record => !record.dangerous);
    
    // Group by date
    const groupedByDate = acquaintanceRecords.reduce((acc, record) => {
      const date = new Date(record.timestamp).toLocaleDateString();
      
      if (!acc[date]) {
        acc[date] = {
          date,
          count: 0
        };
      }
      
      acc[date].count += 1;
      return acc;
    }, {});
    
    // Convert to array and sort by date
    return Object.values(groupedByDate).sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
  };

  if (loading) return <div>Loading entry/exit data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      {/* Combined Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-3">Overall Entry/Exit Frequency</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={combinedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="strangers"
              stroke="#ff0000"
              name="Strangers"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="acquaintances"
              stroke="#00C49F"
              name="Acquaintances"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strangers Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-3">Stranger Entries</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={strangersData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#ff0000"
                name="Stranger Entries"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Acquaintances Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-3">Acquaintance Entries</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={acquaintancesData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#00C49F"
                name="Acquaintance Entries"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EntryExitChartsContainer;
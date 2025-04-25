import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MYIP } from "../../api/ip";
import Home_Temp from "../../hooks/webSocket";

const HistoryLog = () => {
  const [accessRecords, setAccessRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [temperature, humidity, door, devices, connected, noti] = Home_Temp();

  useEffect(() => {
    const fetchAccessRecords = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(`http://${MYIP}/access`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAccessRecords(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching access records:", error);
        setLoading(false);
      }
    };
    fetchAccessRecords();
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            <FaArrowLeft />
          </button>
          <h1 className="text-2xl font-bold">Access History</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <p>Loading access records...</p>
            </div>
          ) : accessRecords.length === 0 ? (
            <div className="flex justify-center items-center h-48">
              <p className="text-gray-500">No access records found</p>
            </div>
          ) : (
            <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
              {accessRecords.map((record) => (
                <div
                  key={record.id}
                  className={`flex items-start gap-4 p-4 border-b ${
                    record.dangerous ? 'bg-red-50' : 'bg-green-50'
                  }`}
                >
                  <div className={`min-w-2 min-h-2 w-2 h-2 mt-2 rounded-full ${
                    record.dangerous ? 'bg-red-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <p className={`${
                      record.dangerous ? 'text-red-700 font-medium' : 'text-green-700 font-medium'
                    }`}>
                      {record.dangerous 
                        ? "⚠️ Warning: A stranger attempted to enter" 
                        : `${record.username} has entered the house`}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(record.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryLog;

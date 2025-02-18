import React, { useEffect, useState } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getByPlan } from "../services/authService";
import { ClipLoader } from "react-spinners";

const LineChartComponent = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // make API call
    const fetchData = async () => {
      try {
        const response = await getByPlan();
        console.log("reponse:", response);

        setChartData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-black font-medium">{label}</p>
          <p className="text-purple-300">
            Premium: {payload[0].value.toFixed(2)}
          </p>
          <p className="text-green-300">
            Standard: {payload[1].value.toFixed(2)}
          </p>
          <p className="text-yellow-300">
            Basic: {payload[2].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[400px] w-full">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-opacity-50">
          <ClipLoader size={50} loading={loading} />
        </div>
      )}
      <ResponsiveContainer width="100%" height={400}>
        <RechartsLineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="month"
            stroke="#fff"
            tick={{ fill: "#fff" }}
            margin={{ top: 20, left: 0, right: 0, bottom: 20 }}
          />
          <YAxis stroke="#fff" tick={{ fill: "#fff" }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" align="right" iconType="circle" />

          {/* Line for Premium */}
          <Line
            type="monotone"
            dataKey="premiumAmount"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, fill: "#a78bfa" }}
            name="Premium"
          />

          {/* Line for Standard */}
          <Line
            type="monotone"
            dataKey="standardAmount"
            stroke="#34d399"
            strokeWidth={3}
            dot={{ fill: "#34d399", strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, fill: "#6ee7b7" }}
            name="Standard"
          />

          {/* Line for Basic */}
          <Line
            type="monotone"
            dataKey="basicAmount"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={{ fill: "#f59e0b", strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, fill: "#fbbf24" }}
            name="Basic"
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;

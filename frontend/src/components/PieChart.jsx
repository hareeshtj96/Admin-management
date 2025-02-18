import React, { useEffect, useState } from "react";
import { getSalesByRegion } from "../services/authService";
import {
  PieChart as RechartPieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ClipLoader } from "react-spinners";

const PieChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // make API call
    const fetchData = async () => {
      try {
        const response = await getSalesByRegion();
        const data = response.data.map((item) => ({
          region: item._id,
          revenue: item.totalRevenue,
        }));
        setChartData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sales by region:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-[400px] w-full relative flex justify-center mt-10 items-center">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-opacity-50">
          <ClipLoader size={50} loading={loading} />
        </div>
      )}
      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 text-transparent bg-clip-text mb-6">
        Sales by Region
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <RechartPieChart>
          <Pie
            data={chartData}
            dataKey="revenue"
            nameKey="region"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            fill="#8b5cf6"
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  [
                    "#8b5cf6",
                    "#a78bfa",
                    "#c084fc",
                    "#d6bcfc",
                    "#f3e8ff",
                    "#9ca3af",
                    "#fbbf24",
                  ][index]
                }
              />
            ))}
          </Pie>
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            wrapperStyle={{
              paddingTop: "20px",
              fontSize: "14px",
              color: "#fff",
            }}
          />
        </RechartPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;

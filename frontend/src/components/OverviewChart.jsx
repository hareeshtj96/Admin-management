import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getSalesByMonth } from "../services/authService";
import { ClipLoader } from "react-spinners";

function CustomTooltip({ payload, label, active }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-md px-3 py-2 text-sm">
        <p className="text-gray-700 font-semibold">{label}</p>
        <p className="text-gray-900">{`Revenue: $${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
}

const OverviewChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API call to fetch data
    const fetchData = async () => {
      try {
        const response = await getSalesByMonth();
        // Plotting data into chart
        const changeData = response.data.map((item) => ({
          name: getMonthName(item._id),
          revenue: item.totalRevenue,
        }));

        // update state with this data
        setChartData(changeData);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    // Call the fetchData function
    fetchData();
  }, []);

  // Function to convert month number to month name
  const getMonthName = (month) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[month - 1];
  };

  return (
    <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-xl shadow-md h-full">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Overview</h2>
      </div>

      <div className="w-full h-[300px] lg:h-[calc(100%-4rem)]">
        {/* loading spinners */}
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <ClipLoader size={50} color="#8884d8" loading={loading} />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 5,
                left: 0,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" tick={{ fontSize: 12 }} tickMargin={8} />
              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Bar dataKey="revenue" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default OverviewChart;

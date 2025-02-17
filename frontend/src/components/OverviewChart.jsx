import React, { act } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", revenue: 2000 },
  { name: "Feb", revenue: 3500 },
  { name: "Mar", revenue: 3000 },
  { name: "Apr", revenue: 6000 },
  { name: "May", revenue: 2500 },
  { name: "Jun", revenue: 2800 },
  { name: "Jul", revenue: 4000 },
  { name: "Aug", revenue: 3500 },
  { name: "Sep", revenue: 3800 },
  { name: "Oct", revenue: 5000 },
  { name: "Nov", revenue: 2000 },
  { name: "Dec", revenue: 2200 },
];

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
  return (
    <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-xl shadow-md h-full">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Overview</h2>
      </div>

      <div className="w-full h-[300px] lg:h-[calc(100%-4rem)]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
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
      </div>
    </div>
  );
};

export default OverviewChart;

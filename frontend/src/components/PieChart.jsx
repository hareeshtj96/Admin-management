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
  const [hovered, setHovered] = useState(null);
  const [clicked, setClicked] = useState(null);

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
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // custom label
  const customLabel = ({ cx, cy, midAngle, outerRadius, value, index }) => {
    // show label only if clicked or hovered
    if (hovered !== index && clicked !== index) return null;

    const RADIAN = Math.PI / 180;
    const x = cx + (outerRadius + 20) * Math.cos(-midAngle * RADIAN);
    const y = cy + (outerRadius + 20) * Math.sin(-midAngle * RADIAN);

    return (
      <>
        <line
          x1={cx + outerRadius * Math.cos(-midAngle * RADIAN)}
          y1={cy + outerRadius * Math.sin(-midAngle * RADIAN)}
          x2={x}
          y2={y}
          stroke="white"
          strokeWidth={1}
        />
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          fontSize={window.innerWidth < 640 ? "10px" : "14px"}
        >
          ${value}
        </text>
      </>
    );
  };

  // Dynamic radius (responsive)
  const getOuterRadius = () => {
    return window.innerWidth < 640 ? "50%" : "80%";
  };

  // Event handlers
  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const handleClick = (index) => {
    if (clickedSector === index) {
      setClickedSector(null);
    } else {
      setClickedSector(index);
    }
  };

  return (
    <div className="w-full max-w-[350px] sm:max-w-full flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 inline-block text-transparent bg-clip-text">
        Sales by Region
      </h2>

      <div className="h-[400px] w-full relative flex justify-center items-center">
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-opacity-50">
            <ClipLoader size={50} loading={loading} />
          </div>
        )}

        <ResponsiveContainer width="100%" height="100%">
          <RechartPieChart>
            <Pie
              data={chartData}
              dataKey="revenue"
              nameKey="region"
              cx="50%"
              cy="50%"
              outerRadius={getOuterRadius()}
              fill="#8b5cf6"
              label={customLabel}
              labelLine={false}
              onMouseEnter={(_, index) => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={(_, index) => handleClick(index)}
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
    </div>
  );
};

export default PieChart;

import React from "react";
import Navbar from "../components/Navbar";
import PieChart from "../components/PieChart";
import LineChartComponent from "../components/LineChart";

const Analytics = () => {
  const retention = 75;
  const arpu = 45.5;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-950 via-purple-800 to-purple-900">
      <Navbar />
      <div className="p-6 sm:p-8 md:p-10">
        <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800">
            Analytics Dashboard
          </h2>
          <p className="text-graye-600 mt-2">Real-time metrics and insights</p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-8 mb-8 grid-cols-1 md:grid-cols-2">
          {/* Chart Section */}
          <div className="p-6 rounded-2xl shadow-lg backdrop-blur-xl bg-transparent">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 inline-block text-transparent bg-clip-text">
              Subscriptions by Plan
            </h3>

            {/* Line Chart */}
            <LineChartComponent />
          </div>

          {/* Pie Chart Section */}
          <PieChart />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Retention Rate */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-black font-semibold text-lg">
                  User Retention
                </h4>
                <p className="text-4xl font-bold text-gray-800 mt-2">
                  {retention}%
                </p>
              </div>
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
            <p className="text-black mt-4 text-sm">
              Active users returning from previous month
            </p>
          </div>

          {/* ARPU Rate */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-black-500 font-semibold text-lg">
                  Average Revenue Per user (ARPU)
                </h4>
                <p className="text-4xl font-bold text-gray-800 mt-2">${arpu}</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
            <p className="text-black mt-4 text-sm">
              Average revenue per user this month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

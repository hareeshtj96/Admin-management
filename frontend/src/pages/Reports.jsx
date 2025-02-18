import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Download } from "lucide-react";
import Navbar from "../components/Navbar";

const Reports = () => {
  const [dateRange, setDateRange] = useState("Last 30 Days");

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [4000, 5000, 3000, 7000, 6000, 8000],
        backgroundColor: "rgba(124, 58, 237, 0.8)",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#1a1a1a",
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#4a4a4a",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        ticks: {
          color: "#4a4a4a",
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const transactions = [
    {
      id: 1,
      name: "Olivia Martin",
      email: "olivia@email.com",
      amount: "$1,999.00",
    },
    {
      id: 2,
      name: "Jackson Lee",
      email: "jackson@email.com",
      amount: "$39.00",
    },
    {
      id: 3,
      name: "Isabella Nguyen",
      email: "isabella@email.com",
      amount: "$299.00",
    },
    { id: 4, name: "William Kim", email: "will@email.com", amount: "$99.00" },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-950 via-purple-800 to-purple-900">
      <div className="container mx-auto px-6">
        <Navbar />
        <div className="flex justify-between items-center my-8">
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <button className="flex items-center gap-2 bg-white text-purple-800 px-6 py-2 rounded-lg hover:bg-gray-100 transition-all shadow-lg">
            <Download size={18} />
            Download Report
          </button>
        </div>

        {/* Filters */}
        <div className="flex justify-end mb-6">
          <select
            className="bg-white text-purple-800 px-4 py-2 rounded-lg shadow-lg outline-none cursor-pointer hover:bg-gray-50 transition-all"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 6 Months</option>
            <option>Last Year</option>
          </select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Total Revenue", value: "$45,231.89", growth: "+12.5%" },
            { title: "Subscriptions", value: "2,350", growth: "+15.2%" },
            { title: "Sales", value: "12,234", growth: "+8.1%" },
            { title: "Active Users", value: "573", growth: "+4.9%" },
          ].map((metric, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300"
            >
              <h3 className="text-gray-600 text-sm">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {metric.value}
              </p>
              <span className="text-green-500 text-sm font-medium">
                {metric.growth} from last month
              </span>
            </div>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="my-8 bg-white p-6 rounded-xl shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Revenue Overview
          </h3>
          <Bar data={data} options={options} />
        </div>

        {/* Transactions Table */}
        <div className="my-8 bg-white p-6 rounded-xl shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Recent Transactions
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 text-gray-600">Name</th>
                  <th className="text-left p-4 text-gray-600">Email</th>
                  <th className="text-left p-4 text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-gray-900 font-medium">{tx.name}</td>
                    <td className="p-4 text-gray-600">{tx.email}</td>
                    <td className="p-4 text-gray-900 font-medium">
                      {tx.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

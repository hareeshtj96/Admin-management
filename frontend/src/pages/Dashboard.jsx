import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StatsSection from "../components/StatsSection";
import OverviewChart from "../components/OverviewChart";
import RecentSales from "../components/RecentSales";
import UserProfile from "../components/UserProfile";

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-950 via-purple-800 to-purple-900">
      <Navbar />
      <div className="p-4 sm:p-6 md:p-8">
        {/* Stats */}
        <StatsSection />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 sm:gap-6 mt-4 sm:mt-6">
          {/* Chart */}
          <div className="lg:col-span-4 min-h-[400px] lg:min-h-0 lg:h-full">
            <OverviewChart />
          </div>
          {/* Recent Sales */}
          <div className="lg:col-span-3 min-h-[400px] lg:min-h-0 lg:h-full">
            <RecentSales />
          </div>
        </div>

        {/* User Profile Table */}
        <div className="mt-6">
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

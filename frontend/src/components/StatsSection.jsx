import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import StatsCard from "../components/StatsCard";
import { getStats } from "../services/authService";

const StatsSection = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  //generate random percentage change
  const getRandomChange = () => {
    const randomChange = (Math.random() * 20 + 1).toFixed(1);
    return `${randomChange}%`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <ClipLoader size={50} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <StatsCard
        title="Total Revenue"
        value={stats.totalRevenue}
        change={getRandomChange()}
      />
      <StatsCard
        title="Subscriptions"
        value={stats.activeSubscriptions}
        change={getRandomChange()}
      />
      <StatsCard
        title="Sales"
        value={stats.totalSales}
        change={getRandomChange()}
      />
      <StatsCard
        title="Active Now"
        value={stats.activeNow}
        change={getRandomChange()}
      />
    </div>
  );
};

export default StatsSection;

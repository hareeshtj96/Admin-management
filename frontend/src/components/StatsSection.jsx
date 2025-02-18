import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import StatsCard from "../components/StatsCard";
import { getStats } from "../services/authService";

const StatsSection = ({ showActiveNow = true, gap = "gap-4" }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [randomChanges, setRandomChanges] = useState({});

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
        const newRandomChanges = {
          totalRevenue: getRandomChange(),
          activeSubscriptions: getRandomChange(),
          totalSales: getRandomChange(),
          activeNow: getRandomChange(),
        };
        setRandomChanges(newRandomChanges);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  // Generate random percentage change
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
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${gap}`}>
      <StatsCard
        title="Total Revenue"
        value={stats.totalRevenue}
        change={randomChanges.totalRevenue}
      />
      <StatsCard
        title="Subscriptions"
        value={stats.activeSubscriptions}
        change={randomChanges.activeSubscriptions}
      />
      <StatsCard
        title="Sales"
        value={stats.totalSales}
        change={randomChanges.totalSales}
      />
      {showActiveNow && (
        <StatsCard
          title="Active Now"
          value={stats.activeNow}
          change={randomChanges.activeNow}
        />
      )}
    </div>
  );
};

export default StatsSection;

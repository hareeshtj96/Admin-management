import React from "react";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";

const Stats = ({ title, value, change }) => {
  const changeColor = change >= 0 ? "text-green-500" : "text-red-500";
  const changeSymbol = change >= 0 ? "+" : "-";

  // Map title to corresponding icons
  const iconMap = {
    "Total Revenue": <DollarSign className="w-6 h-6 text-gray-500" />,
    Subscriptions: <Users className="w-6 h-6 text-gray-500" />,
    Sales: <CreditCard className="w-6 h-6 text-gray-500" />,
    "Active Now": <Activity className="w-6 h-6 text-gray-500" />,
  };

  return (
    <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-xl shadow-md text-black w-full flex flex-col">
      <div className="flex justify-between items-center">
        <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-gray-600 truncate">
          {title}
        </h3>
        <div>{iconMap[title]}</div>
      </div>

      <h2 className="text-lg sm:text-xl lg:text-3xl font-bold mt-1 break-words">
        {title === "Total Revenue" ? `$${value}` : `+${value}`}
      </h2>

      <p className={`text-xs sm:text-sm lg:text-base mt-2 ${changeColor}`}>
        {title === "Active Now"
          ? `${changeSymbol}${change} since last hour`
          : `${changeSymbol}${change}% from last month`}
      </p>
    </div>
  );
};

export default Stats;

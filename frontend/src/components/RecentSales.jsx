import React from "react";

const salesData = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "$1,999.00",
  },
  { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "$39.00" },
  {
    name: "Isabella Nguyen",
    email: "isabel.nguyen@email.com",
    amount: "$299.00",
  },
  { name: "William Kim", email: "will@email.com", amount: "$99.00" },
  { name: "Sofia Davis", email: "sofia.d@email.com", amount: "$39.00" },
];

const RecentSales = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md h-full">
      <h2 className="text-xl font-bold">Recent Sales</h2>
      {salesData.map((sale, index) => (
        <div
          key={index}
          className="flex justify-between py-2 border-b last:border-none"
        >
          <div>
            <h4 className="font-semibold">{sale.name}</h4>
            <p className="text-sm text-gray-600">{sale.email}</p>
          </div>
          <p className="font-bold">{sale.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default RecentSales;

import React, { useState } from "react";
import Navbar from "../components/Navbar";

const transactions = [
  {
    id: 1,
    user: "Olivia Martin",
    amount: 1999,
    status: "Paid",
    date: "15 Feb 2025",
  },
  {
    id: 2,
    user: "Jackson Lee",
    amount: 39,
    status: "Failed",
    date: "14 Feb 2025",
  },
  {
    id: 3,
    user: "Isabella Nguyen",
    amount: 299,
    status: "Pending",
    date: "13 Feb 2025",
  },
  {
    id: 4,
    user: "William Kim",
    amount: 99,
    status: "Refunded",
    date: "12 Feb 2025",
  },
];

const Billing = () => {
  const [filter, setFilter] = useState("All");
  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((t) => t.status === filter);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-950 via-purple-800 to-purple-900">
      <Navbar />
      <div className="p-4 sm:p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
          Billing & Payments
        </h2>

        {/* Revenue */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <h3 className="text-lg font-medium">Total Revenue</h3>
            <p className="text-2xl font-bold">$45,231.89</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <h3 className="text-lg font-medium">Total Payouts</h3>
            <p className="text-2xl font-bold">$38,500.00</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <h3 className="text-lg font-medium">Pending Dues</h3>
            <p className="text-2xl font-bold">$1,250.00</p>
          </div>
        </div>

        {/* Payment Methods*/}
        <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-3">Payment Methods</h3>
          <p>• Linked Bank Account: **** 5678</p>
          <p>• Payment Gateway: PayPal</p>
        </div>

        {/* Transactions */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-lg font-medium mb-3">Transaction History</h3>
          <div className="mb-4">
            <select
              className="p-2 border rounded w-full sm:w-auto"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Refunded">Refunded</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border text-sm md:text-base">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-3">User</th>
                  <th className="border p-3">Amount</th>
                  <th className="border p-3">Status</th>
                  <th className="border p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((t) => (
                  <tr
                    key={t.id}
                    className="text-center bg-gray-50 hover:bg-gray-100"
                  >
                    <td className="border p-3">{t.user}</td>
                    <td className="border p-3">${t.amount}</td>
                    <td className="border p-3 font-medium">
                      <span
                        className={
                          t.status === "Paid"
                            ? "text-green-600"
                            : t.status === "Failed"
                            ? "text-red-600"
                            : t.status === "Pending"
                            ? "text-yellow-600"
                            : "text-gray-600"
                        }
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="border p-3">{t.date}</td>
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

export default Billing;

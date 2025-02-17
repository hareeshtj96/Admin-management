import React, { useState } from "react";
import { ChevronDown, ArrowUpDown } from "lucide-react";

const UserProfile = () => {
  const [filter, setFilter] = useState("");

  const users = [
    { status: "Success", email: "ken99@yahoo.com", amount: "$316.00" },
    { status: "Success", email: "abe45@gmail.com", amount: "$242.00" },
    { status: "Processing", email: "monserrat44@gmail.com", amount: "$837.00" },
    { status: "Success", email: "silas22@gmail.com", amount: "$874.00" },
    { status: "Failed", email: "carmella@hotmail.com", amount: "$721.00" },
  ];

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 w-full mx-auto">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
        User Profiles
      </h2>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Filter emails..."
            className="w-full p-2 pr-8 border border-gray-300 rounded-lg"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
          Columns
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-max border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                Email
                <ArrowUpDown size={16} className="inline-block ml-3" />
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                Amount
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500"></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-sm">{user.status}</td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {user.email}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 flex items-center justify-between">
                  {user.amount}
                  <span className="text-gray-400 ml-0">...</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 px-4 md:px-0">
        <p className="text-sm text-gray-500 mb-2 md:mb-0">
          0 of {users.length} row(s) selected.
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">
            Previous
          </button>
          <button className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

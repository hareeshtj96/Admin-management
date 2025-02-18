import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import UserTable from "./Table";
import { getTransactions } from "../services/authService";
import { ClipLoader } from "react-spinners";
import usePagination from "../hooks/usePagination";

const UserProfile = () => {
  const [filter, setFilter] = useState("");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 5;

  // useEffect
  useEffect(() => {
    // make API call
    const fetchData = async () => {
      try {
        const response = await getTransactions();
        setUserData(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { label: "Status", key: "transactionStatus" },
    { label: "Email", key: "email", sortable: true },
    { label: "Amount", key: "transactionAmount" },
  ];

  // Filter
  const filteredUsers = Array.isArray(userData)
    ? userData.filter(
        (user) =>
          user.email && user.email.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  // pagination logic
  const { currentItems, totalPages, paginate, currentPage } = usePagination(
    filteredUsers,
    itemsPerPage
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 w-full mx-auto">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
        User Profiles
      </h2>

      {/* Filter Section */}
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

      {/* Spinner  */}
      {loading ? (
        <div className="flex justify-center items-center py-4">
          <ClipLoader size={50} color={"#4C51BF"} loading={loading} />
        </div>
      ) : (
        <UserTable data={currentItems} columns={columns} />
      )}

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 px-4 md:px-0">
        <p className="text-sm text-gray-500 mb-2 md:mb-0">
          {filteredUsers.length > 0
            ? `${(currentPage - 1) * itemsPerPage + 1} - ${
                currentPage * itemsPerPage > filteredUsers.length
                  ? filteredUsers.length
                  : currentPage * itemsPerPage
              } of ${filteredUsers.length} row(s) selected.`
            : "No rows available."}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={() =>
              currentPage < totalPages && paginate(currentPage + 1)
            }
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

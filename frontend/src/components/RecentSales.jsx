import React, { useEffect, useState } from "react";
import { getRecentSales } from "../services/authService";
import { ClipLoader } from "react-spinners";
import { getNameFromEmail, getIntialsFromEmail } from "../services/getInitials";
import usePagination from "../hooks/usePagination";

const RecentSales = () => {
  const [recentData, setRecentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  // useEffect
  useEffect(() => {
    // Api call for fetching sales data
    const fetchData = async () => {
      try {
        const response = await getRecentSales();

        setRecentData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // pagination logic
  const { currentItems, totalPages, paginate, currentPage } = usePagination(
    recentData,
    itemsPerPage
  );

  return (
    <div className="bg-white p-5 rounded-xl shadow-md h-full">
      <h2 className="text-xl font-bold">Recent Sales</h2>

      {/* Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <ClipLoader size={50} color={"#4C51BF"} loading={loading} />
        </div>
      ) : (
        <>
          {/* current items */}
          {currentItems && currentItems.length > 0 ? (
            currentItems.map((sale, index) => (
              <div
                key={index}
                className="flex justify-between py-2 last:border-none"
              >
                <div className="flex items-center space-x-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gray-300 text-black flex items-center justify-center">
                    <span className="font-small text-sm">
                      {getIntialsFromEmail(sale._id)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">
                      {getNameFromEmail(sale._id)}
                    </h4>
                    <p className="text-sm text-gray-600">{sale._id}</p>
                  </div>
                </div>

                {/* Amount */}
                <p className="font-semibold">
                  +${sale.latestTransaction?.amount}
                </p>
              </div>
            ))
          ) : (
            <p>No data available.</p>
          )}

          {/* Pagination */}
          <div className="flex justify-end mt-4 space-x-3">
            {/* Previous Button */}
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>

            {/* Next Button */}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecentSales;

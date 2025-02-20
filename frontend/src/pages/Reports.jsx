import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import Navbar from "../components/Navbar";
import StatsSection from "../components/StatsSection";
import UserTable from "../components/Table";
import { getSalesReport } from "../services/authService";
import usePagination from "../hooks/usePagination";
import { getNameFromEmail } from "../services/getInitials";
import DownloadReport from "../components/DownloadReport";

const Reports = () => {
  const [data, setData] = useState([]);

  // setting the items per page
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSalesReport();
        const formattedData = response.data.map((item) => ({
          name:
            item.name && item.name.trim() !== ""
              ? item.name
              : getNameFromEmail(item.email),
          email: item.email,
          region: item.region,
          amount: `$${item.amount || 0}`,
          plan: item.plan,
          last_active: new Date(item.last_active)
            .toISOString()
            .substring(0, 10),
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error occurred while fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Pagination logic
  const { currentItems, totalPages, paginate, currentPage } = usePagination(
    data,
    itemsPerPage
  );

  // Columns for table
  const columns = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Region", key: "region" },
    { label: "Amount", key: "amount", sortable: true },
    { label: "Plan", key: "plan" },
    { label: "Last Active", key: "last_active" },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-950 via-purple-800 to-purple-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Sales Reports</h1>

          {/* Download report component */}
          <div className="relative">
            <DownloadReport
              data={data}
              onDownload={(option) =>
                console.log("Downloading report for", option)
              }
            />
          </div>
        </div>

        {/* Stats  */}
        <div className="gap-8 mb-8">
          <StatsSection />
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Transactions
            </h2>
          </div>
          <div className="overflow-x-auto">
            <UserTable data={currentItems} columns={columns} />
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4 px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => paginate(currentPage - 1)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="mx-4 text-gray-700 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => paginate(currentPage + 1)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;

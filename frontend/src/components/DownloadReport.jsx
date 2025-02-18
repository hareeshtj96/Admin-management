import React, { useState } from "react";
import { Download } from "lucide-react";

const DownloadReport = ({ data, onDownload }) => {
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [downloadOption, setDownloadOption] = useState("Last Month");

  const handleDownload = (option) => {
    setDownloadOption(option);
    setShowDownloadMenu(false);
    onDownload(option);
    generateReport(option);
  };

  // Filter data for "Last Month" and for "Last 6 months"
  const filterData = (data, months) => {
    const dateLimit = new Date();
    dateLimit.setMonth(dateLimit.getMonth() - months);
    return data.filter((item) => new Date(item.last_active) > dateLimit);
  };

  // Generate CSV report
  const generateReport = (option) => {
    const months = option === "Last Month" ? 1 : 6;
    const reportData = filterData(data, months);
    const csvContent = convertToCSV(reportData);
    downloadCSV(csvContent, option);
  };

  // Convert data to CSV format
  const convertToCSV = (data) => {
    const header = ["Name", "Email", "Region", "Amount", "Plan", "Last Active"];
    const rows = data.map((item) => [
      item.name,
      item.email,
      item.region,
      item.amount,
      item.plan,
      item.last_active,
    ]);

    const csvContent = [
      header.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    return csvContent;
  };

  // Trigger download of CSV file
  const downloadCSV = (csvContent, option) => {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const filename = `sales_report_${option.replace(" ", "_")}.csv`;
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, filename);
    } else {
      link.href = URL.createObjectURL(blob);
      link.target = "_blank";
      link.download = filename;
      link.click();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDownloadMenu(!showDownloadMenu)}
        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors duration-200 border border-white/20"
      >
        <Download className="w-4 h-4" />
        <span>Download Report</span>
      </button>

      {showDownloadMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10">
          {["Last Month", "Last 6 Months"].map((option) => (
            <button
              key={option}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
              onClick={() => handleDownload(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DownloadReport;

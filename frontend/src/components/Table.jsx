import React from "react";
import { ArrowUpDown } from "lucide-react";

const UserTable = ({ data, columns }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-max border-separate border-spacing-0">
        <thead>
          <tr className="bg-gray-50">
            {columns.map((col, index) => (
              <th
                key={index}
                className="text-left px-4 py-3 text-sm font-medium text-gray-500"
              >
                {col.label}
                {col.sortable && (
                  <ArrowUpDown size={16} className="inline-block ml-3" />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-4 py-3 text-sm text-gray-900">
                  {col.key === "transactionAmount" ? (
                    <span className="font-semibold">${row[col.key]}</span>
                  ) : (
                    row[col.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

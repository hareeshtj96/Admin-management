import React, { useState } from "react";
import { X } from "lucide-react";
import { updateDatabase } from "../services/authService";
import toast from "react-hot-toast";

const Modal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    plan: "Basic",
    amount_paid: "",
    currency: "USD",
    status: "active",
    region: "",
    start_date: "",
    end_date: "",
    last_active: "",
    cancellation_date: "",
    transactions: [],
  });

  const [newTransaction, setNewTransaction] = useState({
    amount: "",
    date: "",
    status: "completed",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      transactions: [...formData.transactions, newTransaction],
    };
    try {
      const response = await updateDatabase(updatedFormData);
      toast.success(response.message);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMessage);
    }
  };

  const handleTransactionChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({
      ...newTransaction,
      [name]: value,
    });
  };

  const inputClasses =
    "mt-1 p-3 w-full border border-gray-200 rounded-lg focus:ring-2 text-black focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white";
  const labelClasses = "block text-sm font-medium text-gray-600 mb-1";
  const selectClasses =
    "mt-1 p-3 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-gray-800 appearance-none cursor-pointer";

  return (
    <div className="fixed inset-0 bg-gray-500/20 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Sales Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className={labelClasses}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="plan" className={labelClasses}>
                Plan
              </label>
              <select
                id="plan"
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                className={selectClasses}
              >
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
              </select>
              <div className="absolute right-3 top-[2.4rem] pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div>
              <label htmlFor="amount_paid" className={labelClasses}>
                Amount Paid
              </label>
              <input
                type="number"
                id="amount_paid"
                name="amount_paid"
                value={formData.amount_paid}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="currency" className={labelClasses}>
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className={selectClasses}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="INR">INR</option>
              </select>
              <div className="absolute right-3 top-[2.4rem] pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div className="relative">
              <label htmlFor="status" className={labelClasses}>
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={selectClasses}
              >
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="canceled">Canceled</option>
              </select>
              <div className="absolute right-3 top-[2.4rem] pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div>
              <label htmlFor="region" className={labelClasses}>
                Region
              </label>
              <input
                type="text"
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label htmlFor="start_date" className={labelClasses}>
                Start Date
              </label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label htmlFor="end_date" className={labelClasses}>
                End Date
              </label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label htmlFor="last_active" className={labelClasses}>
                Last Active
              </label>
              <input
                type="date"
                id="last_active"
                name="last_active"
                value={formData.last_active}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="cancellation_date" className={labelClasses}>
                Cancellation Date
              </label>
              <input
                type="date"
                id="cancellation_date"
                name="cancellation_date"
                value={formData.cancellation_date}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
          </div>

          <div className="mt-8 w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Transactions
            </h3>

            {/* Add New Transaction */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="transaction-amount" className={labelClasses}>
                    Amount
                  </label>
                  <input
                    type="number"
                    id="transaction-amount"
                    name="amount"
                    value={newTransaction.amount}
                    onChange={handleTransactionChange}
                    className={inputClasses}
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label htmlFor="transaction-date" className={labelClasses}>
                    Date
                  </label>
                  <input
                    type="date"
                    id="transaction-date"
                    name="date"
                    value={newTransaction.date}
                    onChange={handleTransactionChange}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="transaction-status" className={labelClasses}>
                    Status
                  </label>
                  <select
                    id="transaction-status"
                    name="status"
                    value={newTransaction.status}
                    onChange={handleTransactionChange}
                    className={selectClasses}
                  >
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

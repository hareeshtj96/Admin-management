import React from "react";
import Navbar from "../components/Navbar";
import {
  Download,
  AlertCircle,
  Bell,
  Settings,
  CreditCard,
} from "lucide-react";

const Billing = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-950 via-purple-800 to-purple-900">
      <Navbar />
      <div className="p-4 sm:p-6 md:p-8">
        {/* Header  */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Billing & Payments
          </h2>
        </div>
        {/* Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <button className="bg-white p-4 rounded-lg hover:bg-gray-50 transition-colors text-center">
            <CreditCard className="mx-auto mb-2" />
            <span>Add Payment Method</span>
          </button>
          <button className="bg-white p-4 rounded-lg hover:bg-gray-50 transition-colors text-center">
            <Download className="mx-auto mb-2" />
            <span>Download Invoice</span>
          </button>
          <button className="bg-white p-4 rounded-lg hover:bg-gray-50 transition-colors text-center">
            <Settings className="mx-auto mb-2" />
            <span>Billing Settings</span>
          </button>
          <button className="bg-white p-4 rounded-lg hover:bg-gray-50 transition-colors text-center">
            <Bell className="mx-auto mb-2" />
            <span>Notifications</span>
          </button>
        </div>
        {/* Alert  */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 flex items-center text-yellow-800">
          <AlertCircle className="h-6 w-6 mr-3" />
          <div>
            <p className="font-medium">Important Update:</p>
            <p>
              New payment gateway integration available. Update your settings to
              enable additional payment methods.
            </p>
          </div>
        </div>
        {/* Payment Methods */}
        <div className="bg-white shadow-lg rounded-lg mb-6">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Payment Methods</h3>
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                + Add New
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-600">🏦</span>
                  </div>
                  <div>
                    <p className="font-medium">Bank Account</p>
                    <p className="text-sm text-gray-600">**** 5678</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-600">Primary</span>
                  <button className="text-gray-400 hover:text-gray-600">
                    Edit
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-600">💳</span>
                  </div>
                  <div>
                    <p className="font-medium">PayPal</p>
                    <p className="text-sm text-gray-600">Connected</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;

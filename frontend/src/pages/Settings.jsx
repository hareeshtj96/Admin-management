import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Settings, Bell, Shield, CreditCard } from "lucide-react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-950 via-purple-800 to-purple-900">
      <Navbar />
      <div className="flex items-start justify-center mt-14 p-4">
        <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Settings
          </h1>

          {/* Tabs */}
          <div className="flex flex-wrap md:flex-nowrap space-x-2 md:space-x-4 border-b pb-2 overflow-x-auto min-w-[250px]">
            {[
              { value: "general", label: "General", Icon: Settings },
              { value: "notifications", label: "Notifications", Icon: Bell },
              { value: "security", label: "Security", Icon: Shield },
              { value: "billing", label: "Billing", Icon: CreditCard },
            ].map(({ value, label, Icon }) => (
              <button
                key={value}
                onClick={() => setActiveTab(value)}
                className={`flex items-center gap-2 px-3 md:px-4 py-2 text-sm md:text-base font-medium transition-all duration-200 border-b-2 focus:outline-none whitespace-nowrap ${
                  activeTab === value
                    ? "border-b-2 border-purple-500 text-purple-500"
                    : "text-gray-500 hover:text-purple-400"
                }`}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
                {label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="mt-4 md:mt-6 p-4 md:p-6 bg-white shadow-md rounded-lg overflow-auto">
            {activeTab === "general" && (
              <>
                <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
                  General Settings
                </h2>
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <label className="text-sm font-medium">Company Name</label>
                    <input
                      type="text"
                      placeholder="Enter company name"
                      className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Support Email</label>
                    <input
                      type="email"
                      placeholder="support@company.com"
                      className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                    />
                  </div>
                </div>
              </>
            )}

            {activeTab === "notifications" && (
              <>
                <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
                  Notification Preferences
                </h2>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Email Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:bg-gray-900 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                    </label>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Subscription Updates</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:bg-gray-900 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                    </label>
                  </div>
                </div>
              </>
            )}

            {activeTab === "security" && (
              <>
                <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
                  Security Settings
                </h2>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Two-Factor Authentication</span>
                    <input type="checkbox" className="w-5 h-5" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Minimum Password Length
                    </label>
                    <input
                      type="number"
                      defaultValue={8}
                      className="w-20 mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                    />
                  </div>
                </div>
              </>
            )}

            {activeTab === "billing" && (
              <>
                <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
                  Billing Settings
                </h2>
                <div className="space-y-3 md:space-y-4">
                  <button className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                    Add Payment Method
                  </button>
                  <div>
                    <label className="text-sm font-medium">Billing Email</label>
                    <input
                      type="email"
                      placeholder="billing@company.com"
                      className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

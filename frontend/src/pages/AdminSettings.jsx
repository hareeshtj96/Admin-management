import React from "react";
import Navbar from "../components/Navbar";
import { User, Lock, Globe, Bell, Shield, Mail, Users } from "lucide-react";

const AdminSettings = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-950 via-purple-800 to-purple-900">
      <Navbar />
      <div className="p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Admin Settings
          </h2>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <button className="bg-white p-4 rounded-lg hover:bg-gray-50 transition-colors text-center">
            <User className="mx-auto mb-2" />
            <span>Profile Settings</span>
          </button>
          <button className="bg-white p-4 rounded-lg hover:bg-gray-50 transition-colors text-center">
            <Lock className="mx-auto mb-2" />
            <span>Security</span>
          </button>
          <button className="bg-white p-4 rounded-lg hover:bg-gray-50 transition-colors text-center">
            <Users className="mx-auto mb-2" />
            <span>Team Management</span>
          </button>
          <button className="bg-white p-4 rounded-lg hover:bg-gray-50 transition-colors text-center">
            <Bell className="mx-auto mb-2" />
            <span>Notifications</span>
          </button>
        </div>

        {/* Settings  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-lg rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                General Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Language</p>
                    <p className="text-sm text-gray-600">English (US)</p>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                    Change
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Time Zone</p>
                    <p className="text-sm text-gray-600">UTC-8 (PST)</p>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white shadow-lg rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Currently enabled</p>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                    Configure
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Password</p>
                    <p className="text-sm text-gray-600">
                      Last changed 10 days ago
                    </p>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Email  */}
          <div className="bg-white shadow-lg rounded-lg md:col-span-2">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Email Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Marketing Emails</p>
                    <p className="text-sm text-gray-600">
                      Receive product updates
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">System Notifications</p>
                    <p className="text-sm text-gray-600">Important alerts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;

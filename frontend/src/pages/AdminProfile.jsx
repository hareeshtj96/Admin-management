import React, { useState, useEffect } from "react";
import { getInitials } from "../services/getInitials";
import {
  Camera,
  Settings,
  Bell,
  Lock,
  Users,
  HelpCircle,
  User,
  Key,
} from "lucide-react";
import Navbar from "../components/Navbar";
import ChangePasswordModal from "../components/ChangePasswordModal";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminDetails");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-950 via-purple-800 to-purple-900">
      {/* Navbar */}
      <Navbar />

      {/* Profile Section */}
      <div className="w-full mt-12 max-w-4xl mx-auto p-6 mb-8">
        <div className="space-y-4">
          {/* Header */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex flex-row items-center space-x-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-purple-600">
                    {admin ? getInitials(admin.name) : "A"}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 p-1 bg-purple-600 rounded-full text-white">
                  <Camera size={16} />
                </button>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{admin?.name || "Admin"}</h2>
                <p className="text-sm text-gray-400">
                  {admin?.email || "admin@example.com"}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Account settings */}
            <div className="p-4 bg-white rounded-lg shadow hover:bg-purple-50 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <Settings className="text-purple-600" />
                <div>
                  <h3 className="font-semibold">Account Settings</h3>
                  <p className="text-sm text-gray-500">
                    Manage your account details
                  </p>
                </div>
              </div>
              <div className="mt-3 space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2 hover:text-purple-700 cursor-pointer">
                  <User size={16} />
                  <span>Profile Info</span>
                </div>
                <div
                  className="flex items-center space-x-2 hover:text-purple-700 cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Key size={16} />
                  <span>Change Password</span>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="p-4 bg-white rounded-lg shadow hover:bg-purple-50 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <Bell className="text-purple-600" />
                <div>
                  <h3 className="font-semibold">Notifications</h3>
                  <p className="text-sm text-gray-500">
                    Configure alert settings
                  </p>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="p-4 bg-white rounded-lg shadow hover:bg-purple-50 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <Lock className="text-purple-600" />
                <div>
                  <h3 className="font-semibold">Security</h3>
                  <p className="text-sm text-gray-500">
                    Update security preferences
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 hover:bg-purple-50 rounded cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Users className="text-purple-600" />
                  <div>
                    <h3 className="font-semibold">Team Management</h3>
                    <p className="text-sm text-gray-500">
                      Manage team members & roles
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 hover:bg-purple-50 rounded cursor-pointer">
                <div className="flex items-center space-x-3">
                  <HelpCircle className="text-purple-600" />
                  <div>
                    <h3 className="font-semibold">Help & Support</h3>
                    <p className="text-sm text-gray-500">
                      Get help or contact support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password modal*/}
      <ChangePasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default AdminProfile;

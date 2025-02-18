import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ArrowBigUp, Plus } from "lucide-react";
import { getInitials } from "../services/getInitials";
import Modal from "./Modal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const mobileDropdownRef = useRef(null);
  const desktopDropdownRef = useRef(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const admin = localStorage.getItem("adminDetails");
    if (admin) {
      setAdmin(JSON.parse(admin));
    }
  }, []);

  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("adminDetails");
    setAdmin(null);
    window.location.href = "/";
  };

  // click dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target)
      ) {
        setMobileDropdownOpen(false);
      }
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target)
      ) {
        setDesktopDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // profile navigation
  const handleProfile = () => {
    navigate("/profile");
  };

  // billing navigation
  const handleBilling = () => {
    navigate("/billing");
  };

  // settings navigation
  const handleSettings = () => {
    navigate("/adminSettings");
  };

  return (
    <nav className="flex flex-wrap items-center justify-between p-4 bg-transparent text-white border-b border-gray-500 px-6 md:px-12">
      {/* Mobile Menu */}
      <button
        className="md:hidden text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Nav Links */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } w-full md:w-auto md:flex md:items-center md:space-x-6 mt-4 md:mt-0`}
      >
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 pl-4 md:pl-0">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold"
                : "opacity-70 hover:opacity-100"
            }
          >
            Overview
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold"
                : "opacity-70 hover:opacity-100"
            }
          >
            Analytics
          </NavLink>
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold"
                : "opacity-70 hover:opacity-100"
            }
          >
            Reports
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold"
                : "opacity-70 hover:opacity-100"
            }
          >
            Settings
          </NavLink>
          <NavLink
            to="#"
            className="flex items-center relative"
            onClick={(e) => {
              e.preventDefault();
              setModalOpen(true);
            }}
          >
            <Plus size={20} />
          </NavLink>

          {/* Avatar mobile */}
          <div
            className="flex items-center relative md:hidden"
            ref={mobileDropdownRef}
          >
            <button
              className="bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center text-black font-bold"
              onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
            >
              {admin ? getInitials(admin.name) : "A"}
            </button>

            {mobileDropdownOpen && (
              <div className="absolute top-0 left-0 right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 text-black z-50 max-h-[50vh] overflow-auto">
                <div className="px-4 py-2 border-b">
                  {admin ? (
                    <>
                      <p className="font-semibold">{admin.name}</p>
                      <p className="text-sm text-gray-600">{admin.email}</p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-600">Not Logged In</p>
                  )}
                </div>
                <ul className="py-2">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                    onClick={handleProfile}
                  >
                    Profile
                    <span className="flex items-center gap-1">
                      <ArrowBigUp size={16} />
                      ⌘P
                    </span>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                    onClick={handleBilling}
                  >
                    Billing
                    <span className="flex items-center gap-1">⌘B</span>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                    onClick={handleSettings}
                  >
                    Settings
                    <span className="flex items-center gap-1">⌘S</span>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                    onClick={handleLogout}
                  >
                    Log out
                    <span className="flex items-center gap-1">
                      <ArrowBigUp size={16} />
                      ⌘Q
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* large screen Avatar */}
      <div className="relative hidden md:block" ref={desktopDropdownRef}>
        <button
          className="bg-gray-300 w-10 h-10 rounded-full items-center justify-center text-black font-bold"
          onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
        >
          {admin ? getInitials(admin.name) : "A"}
        </button>

        {desktopDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-50 text-black">
            <div className="px-4 py-2 border-b">
              {admin ? (
                <>
                  <p className="font-semibold">{admin.name}</p>
                  <p className="text-sm text-gray-600">{admin.email}</p>
                </>
              ) : (
                <p className="text-sm text-gray-600">Not Logged In</p>
              )}
            </div>
            <ul className="py-2">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                onClick={handleProfile}
              >
                Profile
                <span className="flex items-center gap-1">
                  <ArrowBigUp size={16} />
                  ⌘P
                </span>
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                onClick={handleBilling}
              >
                Billing
                <span className="flex items-center gap-1">⌘B</span>
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                onClick={handleSettings}
              >
                Settings
                <span className="flex items-center gap-1">⌘S</span>
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                onClick={handleLogout}
              >
                Log out
                <span className="flex items-center gap-1">
                  <ArrowBigUp size={16} />
                  ⌘Q
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
      {/* Modal*/}
      {modalOpen && <Modal onClose={() => setModalOpen(false)} />}
    </nav>
  );
};

export default Navbar;

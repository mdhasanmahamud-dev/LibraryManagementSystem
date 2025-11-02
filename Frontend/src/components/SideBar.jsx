import { useState } from "react";
import { NavLink } from "react-router";
import { AiOutlineClose } from "react-icons/ai";
import Navbar from "./Navbar";
import { navLinks } from "../constants/navLinks.js";
import useStudentData from "../hooks/useStudentData.js";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {setManageStudentFee } = useStudentData();
  return (
    <>
      {/* Navbar for mobile */}
      <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />

      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black opacity-50 z-10 md:hidden transition-opacity ${
          isOpen ? "opacity-50 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-50
          flex flex-col overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-0 md:w-64"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-18 px-6 border-b border-gray-200">
          <div className="text-xl font-bold text-indigo-600">Admin Panel</div>
          <button
            className="md:hidden text-gray-700 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <AiOutlineClose />
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`flex-1 overflow-y-auto transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          } md:opacity-100`}
        >
          <div className="p-6 space-y-2">
            <ul className="space-y-2">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 ${
                          isActive
                            ? "bg-blue-100 text-blue-700 font-medium"
                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="text-lg" />
                      <span>{link.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mb-4 text-sm pl-4">
          <button
            onClick={() => setManageStudentFee(true)}
            className="w-4/5 px-3 py-2 bg-indigo-600 text-white rounded-md 
               shadow-sm hover:bg-indigo-700 active:scale-95 
               transition-all duration-200 font-medium cursor-pointer"
          >
            Manage Fees
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;

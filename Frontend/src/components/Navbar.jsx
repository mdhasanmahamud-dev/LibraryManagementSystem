import React from "react";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="md:hidden fixed top-0 left-0 w-full bg-gray-100 p-4 flex justify-between items-center  border-b border-gray-300">
      {/* Left text */}
      <div className="text-xl font-bold text-indigo-600">Admin Panel</div>

      {/* Right menu icon */}
      <button
        onClick={toggleSidebar}
        className="p-2  text-gray-900 cursor-pointer"
      >
        <AiOutlineMenu size={24} />
      </button>
    </nav>
  );
};

export default Navbar;

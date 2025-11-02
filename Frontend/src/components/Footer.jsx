import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12 relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gray-800 opacity-20 pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-5 space-y-10 md:space-y-0">
        {/* Logo & Description */}
        <div className="flex flex-col items-center md:items-start max-w-sm text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-blue-400 mb-2 tracking-widest">
            LibraryMS
          </h1>
          <p className="text-gray-400 text-sm">
            Efficient Library Management System to manage books, students,
            teachers, and library operations seamlessly.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-center">
          {["Dashboard", "Students", "Teachers", "Overview"].map(
            (link, idx) => (
              <a
                key={idx}
                href="#"
                className="text-gray-300 hover:text-white transition-all font-medium hover:scale-105"
              >
                {link}
              </a>
            )
          )}
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
            (Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="bg-gray-800 hover:bg-gradient-to-tr hover:from-blue-500 hover:to-purple-500 p-3 rounded-full text-white transition-transform transform hover:scale-110 shadow-xl hover:shadow-2xl"
              >
                <Icon className="text-lg" />
              </a>
            )
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm relative z-10">
        © 2025 Library Management. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

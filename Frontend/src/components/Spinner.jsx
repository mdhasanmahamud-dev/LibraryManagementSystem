import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-300 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;

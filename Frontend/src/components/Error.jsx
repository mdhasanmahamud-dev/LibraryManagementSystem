import React from "react";

const Error = ({error}) => {
  return (
    <div className="flex justify-center items-center h-screen text-red-500 text-lg">
      Error: {error.message}
    </div>
  );
};

export default Error;

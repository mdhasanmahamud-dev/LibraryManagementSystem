import React from "react";

const StudentInformation = ({ singleStudent }) => {
  if (!singleStudent) {
    return (
      <p className="text-center text-gray-500 mt-6">
        No student data available.
      </p>
    );
  }

  const {
    studentName,
    fatherName,
    motherName,
    className,
    gender,
    bloodGroup,
    dob,
    address,
    classRoll,
    monthlyFee,
    phone,
    image,

  } = singleStudent;

  return (
    <div className="mb-2 bg-white border border-gray-200 rounded-2xl p-8  hover:border-green-500 transition-all duration-300">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-3 mb-6 uppercase tracking-wide">
        Student Details
      </h2>

      {/* Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* 1Left: Image Section */}
        <div className="flex-shrink-0 flex justify-center md:justify-start">
          <img
            src={image}
            alt={studentName}
            className="w-[220px] h-[260px] object-cover rounded-md border border-gray-200 shadow-sm"
          />
        </div>

        {/* 2 & 3 Right: Info Sections */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student Basic Info */}
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-300">
            <p className="flex gap-4 border-b pb-1">
              <span className="font-bold text-gray-900 w-[130px]">Name :</span>
              <span className="text-gray-800 font-semibold capitalize">
                {studentName}
              </span>
            </p>
            <p className="flex gap-4 border-b pb-1">
              <span className="font-bold text-gray-900 w-[130px]">Class :</span>
              <span className="text-gray-800 font-semibold capitalize">
                {className}
              </span>
            </p>
            <div className="flex gap-4 border-b pb-1">
              <span className="font-bold text-gray-900 w-[130px]">
                Class Roll :
              </span>
              <div className="text-gray-800 font-semibold capitalize">
                {classRoll}
              </div>
            </div>
            <p className="flex gap-4 border-b pb-1">
              <span className="font-bold text-gray-900 w-[130px]">
                Gender :
              </span>
              <span className="text-gray-800 font-semibold capitalize">
                {gender}
              </span>
            </p>
            <p className="flex gap-4 border-b pb-1">
              <span className="font-bold text-gray-900 w-[130px]">
                Date of Birth :
              </span>
              <span className="text-gray-800 font-semibold capitalize">
                 {dob.split("T")[0]}
              </span>
            </p>
            <p className="flex gap-4">
              <span className="font-bold text-gray-900 w-[130px]">
                Blood Group :
              </span>
              <span className="text-gray-800 font-semibold">{bloodGroup}</span>
            </p>
          </div>

          {/* Other Info */}
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-300">
            <p className="flex justify-between border-b pb-1">
              <span className="font-medium text-gray-700">Father's Name:</span>
              <span className="text-gray-800 font-semibold">{fatherName}</span>
            </p>
            <p className="flex justify-between border-b pb-1">
              <span className="font-medium text-gray-700">Mother's Name:</span>
              <span className="text-gray-800 font-semibold">{motherName}</span>
            </p>
            <div className="flex justify-between border-b pb-1">
              <span className="font-medium text-gray-700">Phone:</span>
              <div className="text-gray-800 font-semibold">{phone}</div>
            </div>
            <p className="flex justify-between border-b pb-1">
              <span className="font-medium text-gray-700">Monthly Fee:</span>
              <span className="text-gray-800 font-semibold">{monthlyFee} ৳</span>
            </p>
            <div className="flex flex-col md:flex-row md:justify-between gap-1 md:gap-2">
              <p className="font-medium text-gray-700 md:w-38">Address:</p>
              <span className="text-gray-800 font-medium text-sm break-words">
                {address}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInformation;

import { FaUserGraduate, FaIdCard, FaSchool } from "react-icons/fa";

const StudentDetailsInfoHeader = ({ singleStudent }) => {
  const { studentName, className, classRoll } = singleStudent;
  return (
    <div className="w-full relative p-6 bg-gradient-to-r from-blue-900 to-teal-900 text-white rounded-lg shadow-md overflow-hidden">
      {/* Left Decorative Icon */}
      <div className="hidden lg:block absolute left-4 top-1/2 transform -translate-y-1/2 opacity-15 select-none">
        <FaUserGraduate className="text-8xl" />
      </div>

      {/* Center Info */}
      <div className="relative z-10 text-center">
        {/* Student Name */}
        <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
          {studentName}
        </h1>

        {/* Class & Roll */}
        <div className="flex justify-center items-center space-x-4 text-md md:text-lg font-medium mb-2">
          <div className="flex items-center space-x-1 capitalize">
            <FaSchool />
            <span>Class: {className}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaIdCard />
            <div>Roll: {classRoll}</div>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-sm md:text-md font-light opacity-90">
          Student profile overview
        </p>
      </div>

      {/* Right Decorative Icon */}
      <div className="hidden lg:block absolute right-4 top-1/2 transform -translate-y-1/2 opacity-15 select-none">
        <FaUserGraduate className="text-8xl" />
      </div>
    </div>
  );
};

export default StudentDetailsInfoHeader;

import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa";
import useStudentData from "../../hooks/useStudentData";

const DashboardSummary = () => {
  const {totalStudents, totalStudentFees} = useStudentData()
  const summaryData = [
    {
      title: "মোট ছাত্র",
      value: totalStudents,
      icon: <FaUserGraduate className="text-blue-600 text-4xl" />,
    },
    {
      title: "মোট শিক্ষক",
      value: 25,
      icon: <FaChalkboardTeacher className="text-green-600 text-4xl" />,
    },
    {
      title: "মোট টাকা",
      value: `৳ ${totalStudentFees}`,
      icon: <FaMoneyBillWave className="text-yellow-600 text-4xl" />,
    },
    {
      title: "আদায়কৃত টাকা",
      value: "৳ 95,000",
      icon: <FaCheckCircle className="text-teal-600 text-4xl" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {summaryData.map((item, index) => (
        <div
          key={index}
          className="border border-violet-600 transition-all duration-300 rounded-md"
        >
          <div className="p-6 bg-white flex items-center gap-4 rounded-2xl">
            <div className="p-4 rounded-full">{item.icon}</div>
            <div>
              <p className="text-sm font-medium">{item.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">{item.value}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSummary;

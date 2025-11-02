import { FaMoneyBillWave } from "react-icons/fa";

const ClassWiseAmount = () => {
  const classWiseAmountData = [
    { className: "প্রথম শ্রেণি", amount: "7500" },
    { className: "দ্বিতীয় শ্রেণি", amount: "9000" },
    { className: "তৃতীয় শ্রেণি", amount: "10000" },
    { className: "চতুর্থ শ্রেণি", amount: "7000" },
    { className: "পঞ্চম শ্রেণি", amount: "5000" },
    { className: "ষষ্ঠ শ্রেণি", amount: "6000" },
    { className: "সপ্তম শ্রেণি", amount: "5500" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-5 pb-2 text-center sm:text-left">
        ক্লাসভিত্তিক মোট টাকার হিসাব (Class-wise Total Amount Report)
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2  md:grid-cols-4 gap-6">
        {classWiseAmountData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 flex flex-col items-center justify-center 
                            border border-gray-300 hover:shadow-md hover:border-blue-500 hover:scale-[1.01] 
                            transition-all duration-300"
          >
            {/* Logo + Class Name */}
            <div className="flex items-center justify-center gap-3 mb-3">
              {/* Logo with background circle */}
              <div className="bg-blue-100 p-3 rounded-full flex items-center justify-center">
                <FaMoneyBillWave className="text-green-600 text-2xl select-none" />
              </div>

              {/* Title */}
              <div className="text-center">
                <h3 className="text-sm md:text-lg font-semibold text-gray-800">
                  {item.className}
                </h3>
                <p className="text-sm text-gray-500">মোট টাকা</p>
              </div>
            </div>

            {/* Student Count */}
            <p className="text-3xl font-bold text-green-600 mt-2 select-none">
              {item.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassWiseAmount;

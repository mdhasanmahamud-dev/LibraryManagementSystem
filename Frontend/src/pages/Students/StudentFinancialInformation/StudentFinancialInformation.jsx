import useStudentData from "../../../hooks/useStudentData";
import StudentPaymentForm from "./StudentPaymentForm";

const StudentFinancialInformation = () => {
  const {
    singleStudentFinancials,
    singleStudent,
    showPaymentForm,
    setShowPaymentForm,
  } = useStudentData();

  const totalFee = singleStudentFinancials.totalFee;
  const otherFeesTotal = singleStudentFinancials.otherFeesTotal;

  const financialData = [
    { title: "মোট ফি", amount: totalFee || 0 },
    { title: "বার্ষিক টিউশন ফি", amount: singleStudent?.fee },
    { title: "অন্যান্য ফি", amount: otherFeesTotal },
    { title: "পরিশোধিত ফি", amount: 800 },
    { title: "বাকি ফি", amount: 1200 },
  ];

  return (
    <div className="mb-2 p-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-green-500 pb-3 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 uppercase tracking-wide">
          Financial Information
        </h2>
        <button
          onClick={() => setShowPaymentForm(true)}
          className="bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow-sm hover:bg-blue-800 hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          Proceed to Payment
        </button>
      </div>

      {/* Fee Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 md:gap-6 lg:gap-5">
        {financialData.map((item, index) => (
          <div
            key={index}
            className="border border-green-600 rounded-lg p-5 transition-all duration-300 text-center"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-green-700 font-bold text-xl">৳ {item.amount}</p>
          </div>
        ))}
      </div>

      {/*Payment Form Show when true */}
      {showPaymentForm && (
        <div className="mt-8">
          <StudentPaymentForm
            setShowPaymentForm={setShowPaymentForm}
            onClose={() => setShowPaymentForm(false)} // ফর্ম বন্ধ করার অপশন
            studentId={singleStudent?._id}
          />
        </div>
      )}
    </div>
  );
};

export default StudentFinancialInformation;

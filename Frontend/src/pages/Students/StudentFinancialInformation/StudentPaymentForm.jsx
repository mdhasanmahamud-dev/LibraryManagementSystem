import axios from "axios";
import { feeTypes } from "../../../constants/feeTypes";
import { useForm } from "react-hook-form";
import useStudentData from "../../../hooks/useStudentData";
const StudentPaymentForm = ({ setShowPaymentForm, studentId }) => {
  const { payStudentFee, paymentLoading, paymentError } = useStudentData();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Submit Handler
  const onSubmit = async (data) => {
    try {
      await payStudentFee(studentId, data);
      reset();
    } catch (error) {
      console.error("Payment error:", error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Payment Modal */}
      <div className="relative bg-white w-full max-w-md sm:max-w-2xl md:max-w-3xl rounded-xl shadow-lg p-6 sm:p-10 z-10">
        {/* Header */}
        <div>
          <button
            onClick={() => setShowPaymentForm(false)}
            className="absolute top-8 right-8 font-bold text-lg text-gray-700 cursor-pointer hover:text-red-600 transition"
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Student Payment Form
          </h2>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-gray-200 hover:border-green-500 transition-all duration-300 ease-in-out bg-white rounded-md p-5"
        >
          {/* Select Fee Type */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Select Fee Type
            </label>
            <select
              {...register("feeType", { required: false })}
              className="w-full px-3 py-2 border border-gray-900 focus:ring-2 focus:ring-green-400 focus:outline-none rounded"
              defaultValue=""
            >
              <option value="" disabled hidden>
                Select fee type
              </option>
              {feeTypes.map((fee, index) => (
                <option key={index} value={fee.type}>
                  {fee.label}
                </option>
              ))}
            </select>
          </div>

          {/* Amount Input */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-medium">
              Enter Amount
            </label>
            <input
              {...register("amount", {
                required: "Amount is required",
                min: { value: 50, message: "Amount must be greater than 50" },
              })}
              type="number"
              placeholder="Enter amount (৳)"
              className="w-full border border-gray-900 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={paymentLoading}
              className={`${
                paymentLoading
                  ? "bg-blue-600 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800"
              } text-white font-semibold px-8 py-2 rounded-md shadow-md transition-all duration-300 cursor-pointer`}
            >
              {paymentLoading ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentPaymentForm;

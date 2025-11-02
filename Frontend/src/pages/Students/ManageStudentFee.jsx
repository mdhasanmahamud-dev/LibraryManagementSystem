import { useForm } from "react-hook-form";
import { classes } from "../../constants/classes";
import { feeTypes } from "../../constants/feeTypes";
import useStudentData from "../../hooks/useStudentData";
const ManageStudentFee = ({ setManageStudentFee }) => {
  const { addOrUpdateStudentFee, manageStudentLoading } = useStudentData();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addOrUpdateStudentFee(data);
      reset();
    } catch (error) {}
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999]">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white w-full max-w-md sm:max-w-2xl md:max-w-3xl rounded-xl shadow-lg p-6 sm:p-10 z-10">
        <div>
          <button
            className="absolute top-8 right-8 font-bold text-lg text-gray-700 cursor-pointer"
            onClick={() => setManageStudentFee(false)}
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Manage Student Fee
          </h2>
          <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-red-900 text-sm rounded ">
            ⚠️ <span className="font-bold">সতর্কতা!</span> ফি যোগ বা পরিবর্তনের
            আগে নিশ্চিত হোন। এই পরিবর্তনটি নির্বাচিত ক্লাসের সব শিক্ষার্থীর উপর
            প্রভাব ফেলবে।
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-gray-200 hover:border-green-500 transition-all duration-300 ease-in-out bg-white rounded-md p-5"
        >
          {/* Select Class */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Select Class
            </label>
            <select
              {...register("className", { required: "Class is required" })}
              className="w-full px-3 py-2 border border-gray-900 focus:ring-2 focus:ring-green-400 focus:outline-none rounded"
              defaultValue=""
            >
              <option value="">Select class</option>
              {classes.map((group) => (
                <option key={group.value} value={group.value}>
                  {group.label}
                </option>
              ))}
            </select>
            {errors.className && (
              <p className="text-red-500 text-sm mt-1">
                {errors.className.message}
              </p>
            )}
          </div>

          {/* Select Fee Type */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Select Fee Type
            </label>
            <select
              {...register("feeType", { required: "Fee type is required" })}
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
            {errors.feeType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.feeType.message}
              </p>
            )}
          </div>

          {/* Amount Input */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-medium">
              Enter Amount
            </label>
            <input
              {...register("amount", {
                required: "Amount is required",
                min: { value: 1, message: "Amount must be at least 1" },
              })}
              type="number"
              placeholder="Amount"
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
              disabled={manageStudentLoading}
              className={`mt-4 ${
                manageStudentLoading
                  ? "bg-blue-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white px-8 py-2 rounded-lg transition`}
            >
              {manageStudentLoading ? "Processing..." : "Add Fee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageStudentFee;

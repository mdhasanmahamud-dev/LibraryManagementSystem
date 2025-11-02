import { useForm } from "react-hook-form";
import { bloodGroups } from "../../constants/bloodGroups";
import { classes } from "../../constants/classes";
import useStudentData from "../../hooks/useStudentData";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
const AddStudentForm = ({ setShowStudentForm }) => {
  const { addANewStudent, addStudentLoading } = useStudentData();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ===================== Submit Function =====================
  const onSubmit = async (data) => {
    try {
      await addANewStudent(data);
      toast.success("Student Added Successfully!");
      setShowStudentForm(false);
      navigate("/students");
    } catch (err) {
      toast.error("Failed to Add Student!");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Modal Box */}
      <div className="relative bg-white w-full max-w-md sm:max-w-2xl md:max-w-3xl rounded-xl shadow-lg p-6 sm:p-10 z-10">
        {/* Header */}
        <div>
          <button
            onClick={() => setShowStudentForm(false)}
            className="absolute top-5 right-7 text-gray-500 hover:text-gray-800 cursor-pointer text-lg"
          >
            ✕
          </button>
          <h3 className="text-lg text-center sm:text-xl font-semibold  text-black mb-2">
            Add New Student
          </h3>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Student Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Student Name
            </label>
            <input
              {...register("studentName", {
                required: "Student name is required",
              })}
              type="text"
              placeholder="Enter student name"
              className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.studentName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.studentName.message}
              </p>
            )}
          </div>

          {/* Father, Mother & Class */}
          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Father’s Name
              </label>
              <input
                {...register("fatherName", {
                  required: "Father name is required",
                })}
                type="text"
                placeholder="Enter father's name"
                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.fatherName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fatherName.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Mother’s Name
              </label>
              <input
                {...register("motherName", {
                  required: "Mother name is required",
                })}
                type="text"
                placeholder="Enter mother's name"
                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.motherName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.motherName.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Class
              </label>
              <select
                {...register("className", { required: "Class is required" })}
                className="w-full px-3 py-2 border border-gray-900 focus:ring-2 focus:ring-green-400 focus:outline-none rounded"
                defaultValue=""
              >
                <option value="" disabled>
                  Select class
                </option>
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
          </div>

          {/* Gender, Blood Group, DOB */}
          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Gender
              </label>
              <select
                {...register("gender", { required: "Gender is required" })}
                className="w-full px-3 py-2 border border-gray-900 focus:ring-2 focus:ring-green-400 focus:outline-none rounded"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Blood Group
              </label>
              <select
                {...register("bloodGroup", {
                  required: "Blood group is required",
                })}
                className="w-full px-3 py-2 border border-gray-900 focus:ring-2 focus:ring-green-400 focus:outline-none rounded"
                defaultValue=""
              >
                <option value="" disabled>
                  Select blood group
                </option>
                {bloodGroups.map((group) => (
                  <option key={group.value} value={group.value}>
                    {group.label}
                  </option>
                ))}
              </select>
              {errors.bloodGroup && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bloodGroup.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Date of Birth
              </label>
              <input
                {...register("dob", { required: "Date of birth is required" })}
                type="date"
                className="w-full px-3 py-2 border border-gray-900 focus:ring-2 focus:ring-green-400 focus:outline-none rounded"
              />
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dob.message}
                </p>
              )}
            </div>
          </div>

          {/* Address and Class Roll */}
          <div className="flex mb-4 gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Address
              </label>
              <input
                {...register("address", { required: "Address is required" })}
                type="text"
                placeholder="Enter address"
                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Class Roll
              </label>
              <input
                {...register("classRoll", {
                  required: "Class Roll is required",
                })}
                type="text"
                placeholder="Enter 3-digit Class Roll (e.g. 101)"
                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.classRoll && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.classRoll.message}
                </p>
              )}
            </div>
          </div>
          {/* Tuition Fee, Phone, Image */}
          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Monthly Tuition Fee
              </label>
              <input
                {...register("fee", { required: "Fee is required" })}
                type="number"
                placeholder="Enter fee"
                className="w-full px-3 py-2 border border-gray-900 focus:ring-2 focus:ring-green-400 focus:outline-none rounded"
              />
              {errors.fee && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fee.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                {...register("phone", { required: "Phone number is required" })}
                type="text"
                placeholder="Enter phone number"
                className="w-full px-3 py-2 border border-gray-900 focus:ring-2 focus:ring-green-400 focus:outline-none rounded"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Image URL
              </label>
              <input
                {...register("image", { required: "Image URL is required" })}
                type="text"
                placeholder="Enter image URL"
                className="w-full px-3 py-2 border border-gray-900 focus:ring-2 focus:ring-green-400 focus:outline-none rounded"
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={addStudentLoading} // button disable during loading
              className={`bg-green-600 text-white w-full sm:w-auto px-10 py-2 cursor-pointer rounded-sm shadow-md hover:bg-green-700 transition-colors ${
                addStudentLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {addStudentLoading ? "Adding..." : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentForm;

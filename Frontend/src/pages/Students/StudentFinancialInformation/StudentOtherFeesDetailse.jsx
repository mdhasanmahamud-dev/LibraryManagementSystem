import React from "react";
import useStudentData from "../../../hooks/useStudentData";

const StudentOtherFeesDetailse = () => {
  const { singleStudent } = useStudentData();
  const otherFees = singleStudent?.otherFees || {};
  return (
    <div className="mt-6  p-6 transition-all ease-in-out duration-300">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
        Other Fees Details
      </h2>

      {Object.keys(otherFees).length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-md">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 text-gray-700 font-medium border-b">
                  Fee Type
                </th>
                <th className="py-2 px-4 text-gray-700 font-medium border-b">
                  Amount (৳)
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(otherFees).map(([feeType, amount]) => (
                <tr
                  key={feeType}
                  className="hover:bg-blue-50 transition-all ease-in-out duration-200"
                >
                  <td className="py-2 px-4 capitalize text-gray-700 border-b">
                    {feeType.replace("_", " ")}
                  </td>
                  <td className="py-2 px-4 text-gray-900 font-medium border-b">
                    {amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">
          No other fees found for this student.
        </p>
      )}
    </div>
  );
};

export default StudentOtherFeesDetailse;

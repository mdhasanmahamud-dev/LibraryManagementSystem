import React from "react";
import useStudentData from "../../../hooks/useStudentData";
import { useEffect } from "react";

const StudentPaymentTransaction = ({ studentId }) => {
  const {
    transactions,
    fetchStudentTransactions,
    transactionsLoading,
    transactionsError,
  } = useStudentData();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (studentId) {
        await fetchStudentTransactions(studentId);
      }
    };

    fetchTransactions();
  }, [studentId]);

  if (transactionsLoading) return <p>Loading transactions...</p>;
  if (transactionsError)
    return <p className="text-red-500">{transactionsError}</p>;
  if (transactions.length === 0)
    return <p>No transactions found for this student.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Payment Transactions
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Fee Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Amount (৳)
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((txn, index) => (
              <tr
                key={txn._id || txn.id}
                className={`border-b border-gray-500 ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <td className="px-6 py-4 text-sm text-gray-800">
                  {txn.studentName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {txn.feeType}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-green-700">
                  {txn.amount}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {new Date(txn.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentPaymentTransaction;

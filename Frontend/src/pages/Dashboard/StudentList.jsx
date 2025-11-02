import React from "react";
import { NavLink } from "react-router";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import useStudentData from "../../hooks/useStudentData";
import Error from "../../components/Error";

const StudentList = ({ students}) => {
  const { deleteStudentLoading, deleteStudentError, deleteAStudent } =
    useStudentData();
  if (!students || students.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No students found</p>;
  }
  if (deleteStudentError) return <Error error={deleteStudentError} />;

  const handleDeleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await deleteAStudent(id);
    }
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-200 rounded-lg shadow-sm border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left border">Student Name</th>
            <th className="px-6 py-3 text-left border">Class Name</th>
            <th className="px-6 py-3 text-left border">Class Roll</th>
            <th className="px-6 py-3 text-left border">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {students.map((student) => (
            <tr
              key={student._id}
              className="hover:bg-gray-50 transition-colors"
            >
              {/* Image + Name */}
              <td className="px-6 py-2 border">
                <NavLink to={`/studentdetailsinfo/${student._id}`}>
                  <div className="flex items-center gap-4">
                    <img
                      src={student.image}
                      alt={student.studentName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span className="font-medium">{student.studentName}</span>
                  </div>
                </NavLink>
              </td>

              {/* Class */}
              <td className="px-6 py-2 border capitalize">
                Class {student.className}
              </td>

              {/* Roll */}
              <td className="px-6 py-2 border">{student.classRoll}</td>

              {/* Actions */}
              <td className="px-6 py-2 border text-end">
                {/* Edit Icon */}
                <button
                  className="text-blue-500 hover:text-blue-700 mr-4 cursor-pointer"
                  aria-label="Edit"
                >
                  <FaEdit className="size-5" />
                </button>

                {/* Delete Icon */}
                <button
                  onClick={() => handleDeleteStudent(student._id)}
                  disabled={deleteStudentLoading}
                  className={`${
                    deleteStudentLoading ? "opacity-50 cursor-not-allowed" : ""
                  } text-red-500 hover:text-red-700 cursor-pointer transition-opacity duration-200 ease-in-out`}
                  aria-label="Delete"
                >
                  <MdDeleteOutline className="size-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;

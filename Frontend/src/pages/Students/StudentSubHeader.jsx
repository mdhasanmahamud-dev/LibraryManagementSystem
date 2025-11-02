import useStudentData from "../../hooks/useStudentData";
const StudentSubHeader = ({ setShowStudentForm }) => {
  const { totalStudents } = useStudentData();
  return (
    <div className="flex items-center justify-between my-7">
      <h1 className="text-md font-semibold">Total Students : ({totalStudents})</h1>
      <button
        onClick={() => setShowStudentForm(true)}
        className="bg-gray-300 px-5 py-2 rounded-sm border border-gray-400 font-semibold outline-none cursor-pointer hover:bg-gray-400 transition-all duration-300 ease-in-out"
      >
        + Add Student
      </button>
    </div>
  );
};

export default StudentSubHeader;

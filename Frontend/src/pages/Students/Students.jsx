import React, { useState } from "react";
import StudentHeader from "./StudentHeader";
import StudentFilter from "../Dashboard/StudentFilter";
import StudentSubHeader from "./StudentSubHeader";
import AddStudentForm from "./AddStudentForm";
import StudentList from "../Dashboard/StudentList";
import useStudentData from "../../hooks/useStudentData";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import ManageStudentFee from "./ManageStudentFee";
import StudentPaymentForm from "./StudentFinancialInformation/StudentPaymentForm";
const Students = () => {
  const {
    students,
    loading,
    error,
    showManageStudentFee,
    setManageStudentFee,
  } = useStudentData();
  const [showStudentForm, setShowStudentForm] = useState(false);

  // Loading/Error handling
  if (loading) return <Spinner />;
  if (error) return <Error error={error} />;
  return (
    <div>
      <StudentHeader />
      <StudentSubHeader setShowStudentForm={setShowStudentForm} />
      <StudentFilter />
      <StudentList students={students} />
      {showStudentForm && (
        <AddStudentForm setShowStudentForm={setShowStudentForm} />
      )}
      {showManageStudentFee && (
        <ManageStudentFee setManageStudentFee={setManageStudentFee} />
      )}
    </div>
  );
};

export default Students;

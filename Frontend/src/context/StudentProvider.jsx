import { createContext, useEffect, useState } from "react";
import { baseUrl } from "../constants/baseURL";
import axios from "axios";
import { toast } from "react-toastify";
export const StudentContext = createContext(null);

const StudentProvider = ({ children }) => {
  //************************LOADING STATE***************************//
  const [showManageStudentFee, setManageStudentFee] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [singleLoading, setSingleLoading] = useState(false);
  const [addStudentLoading, setAddStudentLoading] = useState(false);
  const [deleteStudentLoading, setDeleteStudentLoading] = useState(false);
  const [manageStudentLoading, setManageStudentLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  //************************ERROR STATE***************************//
  const [error, setError] = useState(null);
  const [singleError, setSingleError] = useState(null);
  const [addStudentError, setAddStudentError] = useState(null);
  const [deleteStudentError, setDeleteStudentError] = useState(null);
  const [manageStudentError, setManageStudentError] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const [transactionsError, setTransactionsError] = useState(null);

  //************************DATA STATE***************************//
  const [students, setStudents] = useState([]);
  const [singleStudent, setSingleStudent] = useState(null);
  const [singleStudentFinancials, setSingleStudentFinancials] = useState({
    totalFee: 0,
    otherFeesTotal: 0,
  });
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalStudentFees, setTotalStudentFees] = useState(0);
  const [transactions, setTransactions] = useState([]);
  //************************FILTER STATE***************************//
  const [filters, setFilters] = useState({ search: "", className: "" });
  const updateFilters = (newFilters) => {
    setFilters((pre) => ({
      ...pre,
      ...newFilters,
    }));
  };

  //*********************** FETCH ALL STUDENTS ************************//
  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.search) {
        params.append("studentName", filters.search);
        params.append("classRoll", filters.search);
      }
      if (filters.className) params.append("className", filters.className);
      const response = await axios.get(
        `${baseUrl}/get-all-students?${params.toString()}`
      );
      setStudents(response.data.students);
      setTotalStudents(response.data.totalStudents);
      setTotalStudentFees(response.data.totalStudentFees);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  //*********************** USE EFFECT FOR FILTER CHANGE ****************//
  useEffect(() => {
    fetchStudents();
  }, [filters]);

  //*********************** FETCH SINGLE STUDENT **********************//
  const fetchSingleStudent = async (id) => {
    setSingleLoading(true);
    setSingleError(null);
    setSingleStudent(null);
    setSingleStudentFinancials({ totalFee: 0, otherFeesTotal: 0 });
    try {
      const response = await axios.get(`${baseUrl}/${id}`);
      setSingleStudent(response.data.student);
      setSingleStudentFinancials({
        totalFee: response.data.totalFee,
        otherFeesTotal: response.data.otherFeesTotal,
      });
    } catch (err) {
      setSingleError(err);
      console.error("Error fetching single student:", err);
    } finally {
      setSingleLoading(false);
    }
  };

  //*********************** ADD NEW STUDENT ************************//
  const addANewStudent = async (studentData) => {
    setAddStudentLoading(true);
    setAddStudentError(null);
    try {
      await axios.post(`${baseUrl}/add-new-student`, studentData);
      // Fresh data fetch for UI update
      await fetchStudents();
    } catch (err) {
      setAddStudentError(err);
      console.error("Error adding new student:", err);
    } finally {
      setAddStudentLoading(false);
    }
  };

  //*********************** DELETE A STUDENT ************************//
  const deleteAStudent = async (id) => {
    setDeleteStudentLoading(true);
    setDeleteStudentError(null);
    try {
      const response = await axios.delete(`${baseUrl}/${id}`);
      toast.success(response.data.message || "Student deleted successfully!");
      await fetchStudents();
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete student.";
      toast.error(message);
      setDeleteStudentError(error);
      console.error("Error deleting student:", error);
    } finally {
      setDeleteStudentLoading(false);
    }
  };

  //*********************** ADD / MANAGE STUDENT FEE ************************//
  const addOrUpdateStudentFee = async (data) => {
    setManageStudentLoading(true);
    setManageStudentError(null);
    try {
      const response = await axios.post(`${baseUrl}/add-other-fee`, data);
      toast.success(response.data.message || "Fee added successfully!");
      await fetchStudents();
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update student fee.";
      toast.error(message);

      setManageStudentError({ type: "error", text: message });
    } finally {
      setManageStudentLoading(false);
    }
  };

  //*********************** PAY STUDENT FEE ************************//
  const payStudentFee = async (studentId, paymentData) => {
    setPaymentLoading(true);
    setPaymentError(null);
    try {
      const response = await axios.post(
        `${baseUrl}/pay-fee/${studentId}`,
        paymentData
      );
      toast.success(response.data.message || "Payment successful!");
      if (singleStudent && singleStudent._id === studentId) {
        await fetchSingleStudent(studentId);
      }
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Payment failed!";
      toast.error(message);
      setPaymentError({ type: "error", text: message });
      throw error;
    } finally {
      setPaymentLoading(false);
    }
  };

  //*********************** FETCH STUDENT TRANSACTIONS ****************//
  const fetchStudentTransactions = async (studentId) => {
    setTransactionsLoading(true);
    setTransactionsError(null);
    try {
      const response = await axios.get(`${baseUrl}/${studentId}/transactions`);
      setTransactions(response.data.transactions);
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch transactions";
      setTransactionsError(message);
      setTransactions([]);
    } finally {
      setTransactionsLoading(false);
    }
  };

  const studentInformation = {
    /********************state*******************/
    showManageStudentFee,
    showPaymentForm,
    loading,
    singleLoading,
    addStudentLoading,
    deleteStudentLoading,
    manageStudentLoading,
    paymentLoading,
    transactionsLoading,
    error,
    singleError,
    addStudentError,
    deleteStudentError,
    manageStudentError,
    paymentError,
    transactionsError,
    students,
    totalStudents,
    totalStudentFees,
    singleStudent,
    singleStudentFinancials,
    transactions,
    filters,
    /******************Actions********************/
    setManageStudentFee,
    setShowPaymentForm,
    setLoading,
    setError,
    setStudents,
    updateFilters,
    fetchSingleStudent,
    fetchStudentTransactions,
    addANewStudent,
    deleteAStudent,
    addOrUpdateStudentFee,
    payStudentFee,
  };
  return (
    <StudentContext.Provider value={studentInformation}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;

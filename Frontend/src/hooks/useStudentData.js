import { useContext } from "react";
import { StudentContext } from "../context/StudentProvider";

const useStudentData = () => {
  const context = useContext(StudentContext);
  if (!context) throw new Error("Must be used within StudentProvider");
  return context;
};

export default useStudentData;

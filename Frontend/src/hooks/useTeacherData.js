import React, { useContext } from "react";
import { TeacherContext } from "../context/TeacherProvider";

const useTeacherData = () => {
  const context = useContext(TeacherContext);
  if (!context) throw new Error("Must be used within StudentProvider");
  return context;
};

export default useTeacherData;

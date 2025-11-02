import React, { createContext } from "react";
export const TeacherContext = createContext(null);
const TeacherProvider = ({ children }) => {
    const teacher = "Hello"
  const teachersInformation = {teacher};
  return (
    <TeacherContext.Provider value={teachersInformation}>
      {children}
    </TeacherContext.Provider>
  );
};

export default TeacherProvider;

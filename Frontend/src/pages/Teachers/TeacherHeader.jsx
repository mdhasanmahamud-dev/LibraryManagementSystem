import React from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";

const TeacherHeader = () => {
  return (
    <div>
      <PageHeader
        title="Teacher Information"
        subtitle="Overview of All Teachers"
        description="Easily view and manage teacher names, subjects, and other important details in one place."
        icon={
          <FaChalkboardTeacher className="text-6xl md:text-8xl lg:text-9xl opacity-30" />
        }
      />
    </div>
  );
};

export default TeacherHeader;

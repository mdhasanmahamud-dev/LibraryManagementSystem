import { FaUserGraduate } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";

const StudentHeader = () => {
  return (
    <div>
      <PageHeader
        title="Student Information"
        subtitle="Overview of All Students"
        description="Quickly view and manage student names, roll numbers, classes, and other essential details in one place."
        icon={<FaUserGraduate />}
      />
    </div>
  );
};

export default StudentHeader;

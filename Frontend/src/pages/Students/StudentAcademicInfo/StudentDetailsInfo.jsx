import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router";
import useStudentData from "../../../hooks/useStudentData";
import StudentDetailsInfoHeader from "./StudentDetailsInfoHeader";
import Spinner from "../../../components/Spinner";
import StudentInfoWrapper from "../StudentInfoWrapper/StudentInfoWrapper";
const StudentDetailsInfo = () => {
  const { id } = useParams();
  const { singleStudent, singleLoading, singleError, fetchSingleStudent } =
    useStudentData();

  useEffect(() => {
    fetchSingleStudent(id);
  }, [id]);

  // Loading/Error handle
  if (singleLoading) return <Spinner />;
  if (singleError) return <Error error={singleError} />;
  if (!singleStudent) return <div>No student data found</div>;

  return (
    <div>
      <StudentDetailsInfoHeader singleStudent={singleStudent} />
      <StudentInfoWrapper singleStudent={singleStudent} />
    </div>
  );
};

export default StudentDetailsInfo;

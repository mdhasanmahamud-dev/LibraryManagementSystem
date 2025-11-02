import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import useStudentData from "../../hooks/useStudentData";
import DashboardSummary from "./DashboardSummary";
import HeroBanner from "./HeroBanner";
import StudentFilter from "./StudentFilter";
import StudentList from "./StudentList";

const Dashboard = () => {
  const {
    students,
    loading,
    error,
  } = useStudentData();
  if (loading) return <Spinner />;
  if (error) return <Error error={error} />;
  return (
    <div>
      <HeroBanner />
      <DashboardSummary />
      <StudentFilter />
      <StudentList students={students} loading={loading}/>
    </div>
  );
};

export default Dashboard;

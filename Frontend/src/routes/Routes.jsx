import { createBrowserRouter } from "react-router";
import App from "../App";
import Dashboard from "../pages/Dashboard/Dashboard";
import PageNotFound from "../pages/ErrorPage/PageNotFound";
import Students from "../pages/Students/Students";
import Teachers from "../pages/Teachers/Teachers";
import Overview from "../pages/Overview/Overview";
import StudentDetailsInfo from "../pages/Students/StudentAcademicInfo/StudentDetailsInfo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "students",
        element: <Students />,
      },
      {
        path: "teachers",
        element: <Teachers />,
      },
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "studentdetailsinfo/:id",
        element: <StudentDetailsInfo />,
      },
    ],
  },
]);

export default router;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/Routes";
import StudentProvider from "./context/StudentProvider";
import TeacherProvider from "./context/TeacherProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TeacherProvider>
      <StudentProvider>
        <RouterProvider router={router} />
      </StudentProvider>
    </TeacherProvider>
  </StrictMode>
);

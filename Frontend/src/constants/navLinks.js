import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { MdOutlineViewList } from "react-icons/md";
import { AiOutlineDashboard } from "react-icons/ai";
export const navLinks = [
  {
    label: "Dashboard",
    path: "/",
    icon: AiOutlineDashboard,
  },
  {
    label: "Students",
    path: "/students",
    icon: FaUserGraduate,
  },
  {
    label: "Teachers",
    path: "/teachers",
    icon: FaChalkboardTeacher,
  },
  {
    label: "Overview",
    path: "/overview",
    icon: MdOutlineViewList,
  },
];

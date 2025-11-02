import { Outlet } from "react-router";
import SideBar from "./components/SideBar";
import ToastProvider from "./components/ToastProvider";

function App() {
  return (
    <div className="flex flex-col md:flex-row">
      <SideBar />
      {/* Main content */}
      <div className="flex flex-col flex-1 md:pl-64">
        {/* Page content */}
        <main className="flex-1 p-4 md:p-8 mt-16 md:mt-0">
          <Outlet />
        </main>
      </div>
      <ToastProvider />
    </div>
  );
}

export default App;

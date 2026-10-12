import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Navbar />

      <div className="dashboard-layout-body">
        <Sidebar />

        <main className="dashboard-layout-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
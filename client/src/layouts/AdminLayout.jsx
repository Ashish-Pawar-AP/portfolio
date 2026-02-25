import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/layout/AdminSidebar";

/**
 * Admin Layout (Theme-Based + Clean Structure)
 */
const AdminLayout = () => {
  return (
    <div
      className="flex min-h-screen transition-colors duration-500"
      style={{
        backgroundColor: "rgb(var(--bg-primary))",
      }}
    >
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
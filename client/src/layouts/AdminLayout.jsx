import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "../store/auth.store";
import AdminSidebar from "../components/layout/AdminSidebar";

/**
 * Admin Layout with protection
 */
const AdminLayout = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

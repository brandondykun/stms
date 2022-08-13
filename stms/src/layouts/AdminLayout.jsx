import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import AdminNav from "../components/AdminNav";
import AdminNavMobile from "../components/AdminNavMobile";

const AdminLayout = () => {
  return (
    <>
      <div className="admin-layout-wrapper">
        <AdminNav />
        <div className="admin-header-content-wrapper">
          <NavBar />
          <AdminNavMobile />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;

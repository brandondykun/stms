import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <aside className="admin-nav">
      <div className="admin-nav-title">Admin</div>
      <NavLink to="overview" className="admin-nav-link">
        <div className="admin-nav-button">Overview</div>
      </NavLink>
      <NavLink to="reassign" className="admin-nav-link">
        <div className="admin-nav-button">Reassign</div>
      </NavLink>
      <NavLink to="schools" className="admin-nav-link">
        <div className="admin-nav-button">Schools</div>
      </NavLink>
      <NavLink to="ets" className="admin-nav-link">
        <div className="admin-nav-button">ETS Time</div>
      </NavLink>
      <NavLink to="delete" className="admin-nav-link">
        <div className="admin-nav-button">Delete Account</div>
      </NavLink>
    </aside>
  );
};

export default AdminNav;

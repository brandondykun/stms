import apiCalls from "../api/apiUtils";
import { useEffect } from "react";
import { useUsersContext } from "../context/UsersContext";
import AdminSection from "./AdminSection";
import AdminHQSection from "./AdminHQSection";
import UnassignedSection from "./UnassignedSection";

const AdminPage = () => {
  const { users, setUsers, active, setActive } = useUsersContext();

  useEffect(() => {
    const getUsers = async () => {
      const res = await apiCalls.getAllUsers();
      if (res.status === 200) {
        setUsers(res.data);
      } else {
        console.error("Error", res.error);
        // handle this error
      }
    };
    getUsers();
  }, []);

  return (
    <div className="primary-content">
      {/* <div className="title-link-container">
        <h1 className="page-title name-title">Admin Page</h1>
      </div> */}
      <div className="admin-sections-container">
        <AdminHQSection />
        <AdminSection sectionName={"ALPHA"} />
      </div>
      <div className="admin-sections-container">
        <AdminSection sectionName={"BRAVO"} />
        <AdminSection sectionName={"CHARLIE"} />
      </div>
      <div className="admin-sections-container">
        <UnassignedSection />
      </div>
    </div>
  );
};

export default AdminPage;

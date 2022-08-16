import AdminSection from "./AdminSection";
import AdminHQSection from "./AdminHQSection";
import UnassignedSection from "./UnassignedSection";

const AdminReassign = () => {
  return (
    <div className="primary-content">
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

export default AdminReassign;

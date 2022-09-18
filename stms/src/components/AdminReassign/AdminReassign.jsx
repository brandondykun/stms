import AdminSection from "../AdminSection";
import AdminHQSection from "../AdminHQSection";
import UnassignedSection from "../UnassignedSection";
import StaffPrivileges from "../StaffPrivileges";
import styles from "./AdminReassign.module.css";

const AdminReassign = () => {
  return (
    <div className={styles.primaryContent}>
      <div className={styles.adminSectionsContainer}>
        <AdminHQSection />
        <AdminSection sectionName={"ALPHA"} />
      </div>
      <div className={styles.adminSectionsContainer}>
        <AdminSection sectionName={"BRAVO"} />
        <AdminSection sectionName={"CHARLIE"} />
      </div>
      <div className={styles.adminSectionsContainer}>
        <UnassignedSection />
        <StaffPrivileges />
      </div>
    </div>
  );
};

export default AdminReassign;

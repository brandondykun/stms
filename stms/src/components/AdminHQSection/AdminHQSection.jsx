import { useUsersContext } from "../../context/UsersContext";
import utils from "../../utils/utils";
import AdminName from "../AdminName";
import styles from "./AdminHQSection.module.css";

const AdminHQSection = () => {
  const { users } = useUsersContext();

  const filteredUsers = utils
    .filter(users, "section", "BN STAFF")
    .sort((a, b) => {
      return a.unit_position - b.unit_position;
    });

  return (
    <div className={styles.adminSection}>
      <h2 className={styles.adminSectionTitle}>BN STAFF</h2>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => {
          return <AdminName user={user} key={user.id} />;
        })
      ) : (
        <div className={styles.noneAssignedText}>No one assigned</div>
      )}
    </div>
  );
};

export default AdminHQSection;

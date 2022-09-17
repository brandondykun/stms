import { useUsersContext } from "../../context/UsersContext";
import utils from "../../utils/utils";
import AdminTeam from "../AdminTeam";
import styles from "./AdminSection.module.css";

const AdminSection = ({ sectionName }) => {
  const { users } = useUsersContext();

  const filteredUsers = utils.filter(users, "section", sectionName);

  return (
    <div className={styles.adminSection}>
      <h2 className={styles.adminSectionTitle}>{sectionName}</h2>
      <AdminTeam users={filteredUsers} team={"HQ"} />
      <AdminTeam users={filteredUsers} team={"1"} />
      <AdminTeam users={filteredUsers} team={"2"} />
      <AdminTeam users={filteredUsers} team={"3"} />
    </div>
  );
};

export default AdminSection;

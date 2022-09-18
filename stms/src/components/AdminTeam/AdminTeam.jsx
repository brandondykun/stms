import utils from "../../utils/utils";
import AdminName from "../AdminName";
import styles from "./AdminTeam.module.css";

const AdminTeam = ({ users, team }) => {
  const filteredUsers = utils.filter(users, "team", team).sort((a, b) => {
    return a.unit_position - b.unit_position;
  });

  return (
    <div className={styles.adminTeam}>
      <h3 className={styles.adminTeamTitle}>Team: {team}</h3>
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

export default AdminTeam;

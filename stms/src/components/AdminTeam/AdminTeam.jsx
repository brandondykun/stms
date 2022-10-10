import utils from "../../utils/utils";
import AdminName from "../AdminName";
import styles from "./AdminTeam.module.css";
import { AnimatePresence, motion } from "framer-motion";

const AdminTeam = ({ users, team }) => {
  const filteredUsers = utils.filter(users, "team", team).sort((a, b) => {
    return a.unit_position - b.unit_position;
  });

  return (
    <div className={styles.adminTeam}>
      <h3 className={styles.adminTeamTitle}>Team: {team}</h3>
      <AnimatePresence mode="popLayout">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => {
            return (
              <motion.div
                layout
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "just" }}
                key={user.id}
              >
                <AdminName user={user} key={user.id} />
              </motion.div>
            );
          })
        ) : (
          <div className={styles.noneAssignedText}>No one assigned</div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminTeam;

import { useUsersContext } from "../../context/UsersContext";
import utils from "../../utils/utils";
import AdminName from "../AdminName";
import styles from "./AdminHQSection.module.css";
import { AnimatePresence, motion } from "framer-motion";

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

export default AdminHQSection;

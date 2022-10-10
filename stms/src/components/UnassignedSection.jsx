import { useUsersContext } from "../context/UsersContext";
import AdminName from "./AdminName";
import utils from "../utils/utils";
import { AnimatePresence, motion } from "framer-motion";

const UnassignedSection = () => {
  const { users, setUsers, active, setActive } = useUsersContext();

  const sectionName = "UNASSIGNED";

  const filteredUsers = utils.filter(users, "section", sectionName);

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">{sectionName}</h2>
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
          <div className="none-assigned-text">No one assigned</div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UnassignedSection;

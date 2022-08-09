import { useUsersContext } from "../context/UsersContext";
import AdminName from "./AdminName";
import utils from "../utils/utils";

const UnassignedSection = () => {
  const { users, setUsers, active, setActive } = useUsersContext();

  const sectionName = "UNASSIGNED";

  const filteredUsers = utils.filter(users, "section", sectionName);

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">{sectionName}</h2>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => {
          return <AdminName user={user} key={user.id} />;
        })
      ) : (
        <div className="none-assigned-text">No one assigned</div>
      )}
    </div>
  );
};

export default UnassignedSection;

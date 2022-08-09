import { useUsersContext } from "../context/UsersContext";
import utils from "../utils/utils";
import AdminName from "./AdminName";

const AdminHQSection = () => {
  const { users, setUsers, active, setActive } = useUsersContext();

  const filteredUsers = utils
    .filter(users, "section", "BN STAFF")
    .sort((a, b) => {
      return a.unit_position - b.unit_position;
    });

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">BN STAFF</h2>
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

export default AdminHQSection;

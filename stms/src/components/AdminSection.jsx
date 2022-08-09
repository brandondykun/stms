import { useUsersContext } from "../context/UsersContext";
import utils from "../utils/utils";
import AdminTeam from "./AdminTeam";

const AdminSection = ({ sectionName }) => {
  const { users, setUsers, active, setActive } = useUsersContext();

  const filteredUsers = utils.filter(users, "section", sectionName);

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">{sectionName}</h2>
      <AdminTeam users={filteredUsers} team={"HQ"} />
      <AdminTeam users={filteredUsers} team={"1"} />
      <AdminTeam users={filteredUsers} team={"2"} />
      <AdminTeam users={filteredUsers} team={"3"} />
    </div>
  );
};

export default AdminSection;

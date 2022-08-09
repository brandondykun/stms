import utils from "../utils/utils";
import AdminName from "./AdminName";

const AdminTeam = ({ users, team }) => {
  const filteredUsers = utils.filter(users, "team", team).sort((a, b) => {
    return a.unit_position - b.unit_position;
  });

  return (
    <div className="admin-team">
      <h3 className="admin-team-title">Team: {team}</h3>
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

export default AdminTeam;

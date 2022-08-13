import { useUsersContext } from "../context/UsersContext";

const AdminOverview = () => {
  const { users, setUsers, active, setActive } = useUsersContext();

  return (
    <div className="primary-content">
      <div>Admin Overview</div>
      {users.map((user) => {
        return (
          <div>
            {user.rank} {user.last_name}
          </div>
        );
      })}
    </div>
  );
};

export default AdminOverview;

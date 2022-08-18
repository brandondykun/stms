import { useUsersContext } from "../context/UsersContext";

const NeedLicense = () => {
  const { users } = useUsersContext();

  const userList = users.filter((user) => {
    return user.drivers_license === false;
  });
  return (
    <div className="dlc-incomplete-list">
      <div className="chart-title gold-title">Need Licensed</div>
      <div className="admin-list-items-container">
        {userList?.length > 0 ? (
          userList.map((user) => {
            return (
              <div className="admin-chart-list-item" key={user.id}>
                {user.rank} {user.last_name}
              </div>
            );
          })
        ) : (
          <div>none</div>
        )}
      </div>
    </div>
  );
};

export default NeedLicense;

import { useUsersContext } from "../context/UsersContext";

const JfoQualified = () => {
  const { users } = useUsersContext();

  const userList = users.filter((user) => {
    return user.jfo_qualified === true;
  });
  return (
    <div className="dlc-incomplete-list">
      <div className="chart-title gold-title">JFO Qualified</div>
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

export default JfoQualified;

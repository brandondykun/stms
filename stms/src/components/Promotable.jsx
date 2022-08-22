import { useUsersContext } from "../context/UsersContext";
import utils from "../utils/utils";

const Promotable = () => {
  const { users } = useUsersContext();

  const userList = users.filter((user) => {
    return utils.isPromotable(user) === true;
  });

  return (
    <div className="dlc-incomplete-list">
      <div className="chart-title gold-title">Promotable</div>
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
          <div className="color-dark-placeholder">None</div>
        )}
      </div>
    </div>
  );
};

export default Promotable;

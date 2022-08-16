import { useUsersContext } from "../context/UsersContext";
import utils from "../utils/utils";

const DlcIncompleteList = () => {
  const { users, setUsers, active, setActive } = useUsersContext();

  const userList = users.filter((user) => {
    return utils.dlcIncomplete(user) === true;
  });

  return (
    <div className="dlc-incomplete-list">
      <div className="chart-title gold-title">DLC Incomplete</div>
      {userList?.map((user) => {
        return (
          <div className="admin-chart-list-item" key={user.id}>
            {user.rank} {user.last_name}
          </div>
        );
      })}
    </div>
  );
};

export default DlcIncompleteList;

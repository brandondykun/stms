import { useUsersContext } from "../context/UsersContext";
import dayjs from "dayjs";
import utils from "../utils/utils";

const EtsTime = () => {
  const { users } = useUsersContext();

  const sortedUsers = users.sort((a, b) => {
    return a.ets.seconds - b.ets.seconds;
  });

  return (
    <div className="ets-table-container">
      <table className="ets-table">
        <tbody className="ets-table-body">
          <tr className="ets-table-record">
            <th>Name</th>
            <th className="hide-800">Rank</th>
            <th className="hide-500">ETS Date</th>
            <th>ETS</th>
          </tr>
          {sortedUsers.map((user) => {
            const etsDate = dayjs(user.ets.seconds * 1000);
            const now = dayjs();
            const diff = etsDate.diff(now, "day");
            const formattedDiff = utils.getFormattedStringFromDays(diff);
            return (
              <tr
                className={`ets-table-record ${diff <= 365 ? "red-bcg" : ""}`}
                key={user.id}
              >
                <td className="ets-table-td-name">
                  {user.last_name}, {user.first_name}
                </td>
                <td className="hide-800">{user.rank}</td>
                <td className="hide-500">{etsDate.format("DD MMM YYYY")}</td>
                <td>{formattedDiff}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EtsTime;

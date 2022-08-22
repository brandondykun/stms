import { useUsersContext } from "../context/UsersContext";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

const Schools = () => {
  const [schools, setSchools] = useState();
  const { users } = useUsersContext();

  useEffect(() => {
    const usersWithSchoolsArr = users.filter((user) => {
      return user.schools.length > 0;
    });

    let schoolsList = [];
    usersWithSchoolsArr.forEach((user) => {
      const schools = user.schools;
      const first_name = user.first_name;
      const last_name = user.last_name;
      const rank = user.rank;
      schools.forEach((school) => {
        schoolsList.push({ ...school, first_name, last_name, rank });
      });
    });

    setSchools(
      schoolsList.sort((a, b) => {
        return a.start_date.seconds - b.start_date.seconds;
      })
    );
  }, [users]);

  return (
    <div className="ets-table-container">
      <table className="ets-table">
        <tbody className="ets-table-body">
          <tr className="ets-table-record">
            <th>Name</th>
            <th className="hide-500">School</th>
            <th>Start</th>
            <th className="hide-800">End</th>
          </tr>
          {schools?.map((user) => {
            const startDate = dayjs(user.start_date.seconds * 1000);
            const endDate = dayjs(user.end_date.seconds * 1000);
            return (
              <tr
                className="ets-table-record"
                key={`${user.last_name}-${user.start_date.seconds}`}
              >
                <td className="ets-table-td-name">
                  {user.last_name}, {user.first_name}
                </td>
                <td className="hide-800">{user.school_name}</td>
                <td>{startDate.format("DD MMM YYYY")}</td>
                <td className="hide-500">{endDate.format("DD MMM YYYY")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Schools;

import { useUsersContext } from "../../context/UsersContext";
import styles from "./AcftFail.module.css";

const AcftFail = () => {
  const { users } = useUsersContext();

  const userList = users.filter((user) => {
    return !user.acft_pass;
  });

  return (
    <div className={styles.dlcIncompleteList}>
      <div className={styles.title}>ACFT Fail</div>
      <div className={styles.adminListItemsContainer}>
        {userList?.length > 0 ? (
          userList.map((user) => {
            return (
              <div className={styles.adminChartListItem} key={user.id}>
                {user.rank} {user.last_name}
              </div>
            );
          })
        ) : (
          <div className={styles.colorDarkPlaceholder}>None</div>
        )}
      </div>
    </div>
  );
};

export default AcftFail;

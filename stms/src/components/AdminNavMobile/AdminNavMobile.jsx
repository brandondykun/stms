import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faListDots,
  faGraduationCap,
  faClock,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./AdminNavMobile.module.css";

const AdminNavMobile = () => {
  return (
    <div className={styles.adminNavMobile}>
      <NavLink
        to="overview"
        className={({ isActive }) =>
          isActive
            ? `${styles.adminMobileLink} ${styles.activeLink}`
            : styles.adminMobileLink
        }
      >
        <FontAwesomeIcon icon={faChartBar} size="lg" />
      </NavLink>
      <NavLink
        to="reassign"
        className={({ isActive }) =>
          isActive
            ? `${styles.adminMobileLink} ${styles.activeLink}`
            : styles.adminMobileLink
        }
      >
        <FontAwesomeIcon icon={faListDots} size="lg" />
      </NavLink>
      <NavLink
        to="schools"
        className={({ isActive }) =>
          isActive
            ? `${styles.adminMobileLink} ${styles.activeLink}`
            : styles.adminMobileLink
        }
      >
        <FontAwesomeIcon icon={faGraduationCap} size="lg" />
      </NavLink>
      <NavLink
        to="ets"
        className={({ isActive }) =>
          isActive
            ? `${styles.adminMobileLink} ${styles.activeLink}`
            : styles.adminMobileLink
        }
      >
        <FontAwesomeIcon icon={faClock} size="lg" />
      </NavLink>
      <NavLink
        to="delete-account"
        className={({ isActive }) =>
          isActive
            ? `${styles.adminMobileLink} ${styles.activeLink}`
            : styles.adminMobileLink
        }
      >
        <FontAwesomeIcon icon={faTrashCan} size="lg" />
      </NavLink>
    </div>
  );
};

export default AdminNavMobile;

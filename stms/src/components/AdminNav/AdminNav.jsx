import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faListDots,
  faGraduationCap,
  faClock,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./AdminNav.module.css";

const AdminNav = () => {
  return (
    <aside className={styles.adminNav}>
      <div className={styles.adminNavTitle}>Admin</div>

      <NavLink
        to="overview"
        className={({ isActive }) =>
          isActive
            ? `${styles.adminNavButton} ${styles.activeLink}`
            : styles.adminNavButton
        }
      >
        <FontAwesomeIcon
          icon={faChartBar}
          size="1x"
          className={styles.buttonIconWrapper}
        />
        <span className={styles.adminNavButtonText}>Overview</span>
      </NavLink>

      <NavLink
        to="reassign"
        className={({ isActive }) =>
          isActive
            ? `${styles.adminNavButton} ${styles.activeLink}`
            : styles.adminNavButton
        }
      >
        <div>
          <FontAwesomeIcon
            icon={faListDots}
            size="1x"
            className={styles.buttonIconWrapper}
          />
          <span className={styles.adminNavButtonText}>Reassign</span>
        </div>
      </NavLink>

      <NavLink
        to="schools"
        className={({ isActive }) =>
          isActive
            ? `${styles.adminNavButton} ${styles.activeLink}`
            : styles.adminNavButton
        }
      >
        <div>
          <FontAwesomeIcon
            icon={faGraduationCap}
            size="1x"
            className={styles.buttonIconWrapper}
          />
          <span className={styles.adminNavButtonText}>Schools</span>
        </div>
      </NavLink>

      <NavLink
        to="ets"
        className={({ isActive }) =>
          isActive
            ? `${styles.adminNavButton} ${styles.activeLink}`
            : styles.adminNavButton
        }
      >
        <div>
          <FontAwesomeIcon
            icon={faClock}
            size="1x"
            className={styles.buttonIconWrapper}
          />
          <span className={styles.adminNavButtonText}>ETS Time</span>
        </div>
      </NavLink>

      <NavLink
        to="delete-account"
        className={({ isActive }) =>
          isActive
            ? `${styles.adminNavButton} ${styles.activeLink}`
            : styles.adminNavButton
        }
      >
        <div>
          <FontAwesomeIcon
            icon={faTrashCan}
            size="1x"
            className={styles.buttonIconWrapper}
          />
          <span className={styles.adminNavButtonText}>Delete Account</span>
        </div>
      </NavLink>
    </aside>
  );
};

export default AdminNav;

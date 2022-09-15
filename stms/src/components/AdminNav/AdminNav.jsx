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
import { useState } from "react";

const AdminNav = () => {
  const [activeLink, setActiveLink] = useState(1);

  return (
    <aside className={styles.adminNav}>
      <div className={styles.adminNavTitle}>Admin</div>
      <NavLink
        to="overview"
        className={styles.adminNavLink}
        onClick={() => setActiveLink(1)}
      >
        <div
          className={`${styles.adminNavButton} ${
            activeLink === 1 ? styles.activeLink : ""
          }`}
        >
          <FontAwesomeIcon
            icon={faChartBar}
            size="1x"
            className={styles.buttonIconWrapper}
          />
          <span className={styles.adminNavButtonText}>Overview</span>
        </div>
      </NavLink>
      <NavLink
        to="reassign"
        className={styles.adminNavLink}
        onClick={() => setActiveLink(2)}
      >
        <div
          className={`${styles.adminNavButton} ${
            activeLink === 2 ? styles.activeLink : ""
          }`}
        >
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
        className={styles.adminNavLink}
        onClick={() => setActiveLink(3)}
      >
        <div
          className={`${styles.adminNavButton} ${
            activeLink === 3 ? styles.activeLink : ""
          }`}
        >
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
        className={styles.adminNavLink}
        onClick={() => setActiveLink(4)}
      >
        <div
          className={`${styles.adminNavButton} ${
            activeLink === 4 ? styles.activeLink : ""
          }`}
        >
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
        className={styles.adminNavLink}
        onClick={() => setActiveLink(5)}
      >
        <div
          className={`${styles.adminNavButton} ${
            activeLink === 5 ? styles.activeLink : ""
          }`}
        >
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

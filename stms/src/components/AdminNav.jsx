import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faListDots,
  faGraduationCap,
  faClock,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const AdminNav = () => {
  return (
    <aside className="admin-nav">
      <div className="admin-nav-title">Admin</div>
      <NavLink to="overview" className="admin-nav-link">
        <div className="admin-nav-button">
          <FontAwesomeIcon
            icon={faChartBar}
            size="1x"
            className="button-icon-wrapper"
          />
          <span className="admin-nav-button-text">Overview</span>
        </div>
      </NavLink>
      <NavLink to="reassign" className="admin-nav-link">
        <div className="admin-nav-button">
          <FontAwesomeIcon
            icon={faListDots}
            size="1x"
            className="button-icon-wrapper"
          />
          <span className="admin-nav-button-text">Reassign</span>
        </div>
      </NavLink>
      <NavLink to="schools" className="admin-nav-link">
        <div className="admin-nav-button">
          <FontAwesomeIcon
            icon={faGraduationCap}
            size="1x"
            className="button-icon-wrapper"
          />
          <span className="admin-nav-button-text">Schools</span>
        </div>
      </NavLink>
      <NavLink to="ets" className="admin-nav-link">
        <div className="admin-nav-button">
          <FontAwesomeIcon
            icon={faClock}
            size="1x"
            className="button-icon-wrapper"
          />
          <span className="admin-nav-button-text">ETS Time</span>
        </div>
      </NavLink>
      <NavLink to="delete" className="admin-nav-link">
        <div className="admin-nav-button">
          <FontAwesomeIcon
            icon={faTrashCan}
            size="1x"
            className="button-icon-wrapper"
          />
          <span className="admin-nav-button-text">Delete Account</span>
        </div>
      </NavLink>
    </aside>
  );
};

export default AdminNav;

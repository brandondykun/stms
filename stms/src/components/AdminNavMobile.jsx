import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faListDots,
  faGraduationCap,
  faClock,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const AdminNavMobile = () => {
  return (
    <div className="admin-nav-mobile">
      <NavLink to="overview" className="admin-mobile-link">
        <FontAwesomeIcon icon={faChartBar} size="lg" />
      </NavLink>
      <NavLink to="reassign" className="admin-mobile-link">
        <FontAwesomeIcon icon={faListDots} size="lg" />
      </NavLink>
      <NavLink to="schools" className="admin-mobile-link">
        <FontAwesomeIcon icon={faGraduationCap} size="lg" />
      </NavLink>
      <NavLink to="ets" className="admin-mobile-link">
        <FontAwesomeIcon icon={faClock} size="lg" />
      </NavLink>
      <NavLink to="delete-account" className="admin-mobile-link">
        <FontAwesomeIcon icon={faTrashCan} size="lg" />
      </NavLink>
    </div>
  );
};

export default AdminNavMobile;

import { Link } from "react-router-dom";
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
      <Link to="overview" className="admin-mobile-link">
        <FontAwesomeIcon icon={faChartBar} size="lg" />
      </Link>
      <Link to="reassign" className="admin-mobile-link">
        <FontAwesomeIcon icon={faListDots} size="lg" />
      </Link>
      <Link to="schools" className="admin-mobile-link">
        <FontAwesomeIcon icon={faGraduationCap} size="lg" />
      </Link>
      <Link to="ets" className="admin-mobile-link">
        <FontAwesomeIcon icon={faClock} size="lg" />
      </Link>
      <Link to="delete" className="admin-mobile-link">
        <FontAwesomeIcon icon={faTrashCan} size="lg" />
      </Link>
    </div>
  );
};

export default AdminNavMobile;

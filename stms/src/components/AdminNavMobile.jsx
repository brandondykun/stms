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
      <Link to="admin" className="admin-mobile-link">
        <FontAwesomeIcon icon={faChartBar} size="lg" />
      </Link>
      <Link to="admin" className="admin-mobile-link">
        <FontAwesomeIcon icon={faListDots} size="lg" />
      </Link>
      <Link to="admin" className="admin-mobile-link">
        <FontAwesomeIcon icon={faGraduationCap} size="lg" />
      </Link>
      <Link to="admin" className="admin-mobile-link">
        <FontAwesomeIcon icon={faClock} size="lg" />
      </Link>
      <Link to="admin" className="admin-mobile-link">
        <FontAwesomeIcon icon={faTrashCan} size="lg" />
      </Link>
    </div>
  );
};

export default AdminNavMobile;
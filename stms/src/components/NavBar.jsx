import { NavLink, useNavigate } from "react-router-dom";
import apiCalls from "../api/apiUtils";
import { useAuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const { setCurrentUser, accountInfo, setAccountInfo } = useAuthContext();

  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await apiCalls.logOut();
      setCurrentUser(null);
      setAccountInfo(null);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {accountInfo?.user_id && (
        <nav className="primary-nav">
          <div className="primary-nav-left">
            <NavLink
              to="/home"
              data-cy="nav-bar-home"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>

            <NavLink
              to={`/user-info/${accountInfo?.id}`}
              data-cy="nav-bar-my-info"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              My Info
            </NavLink>

            <NavLink
              to={`/exam/landing`}
              data-cy="nav-bar-exam"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Exam
            </NavLink>

            {accountInfo?.is_staff && (
              <NavLink
                to="/admin/overview"
                data-cy="nav-bar-admin"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Admin
              </NavLink>
            )}
          </div>

          <div
            className="nav-link sign-out-nav-link"
            data-cy="nav-bar-sign-out"
            onClick={logOut}
          >
            <FontAwesomeIcon icon={faSignOutAlt} size="1x" />
          </div>
        </nav>
      )}
    </>
  );
};

export default NavBar;

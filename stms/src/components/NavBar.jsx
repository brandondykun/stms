import { NavLink, useNavigate } from "react-router-dom";
import apiCalls from "../api/apiUtils";
import { useAuthContext } from "../context/AuthContext";

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
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to={`/user-info/${accountInfo?.id}`}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            My Info
          </NavLink>

          <NavLink
            to={`/exam/landing`}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Exam
          </NavLink>

          {accountInfo?.is_staff && (
            <NavLink
              to="/admin/overview"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Admin
            </NavLink>
          )}

          <div className="nav-link" onClick={logOut}>
            Sign Out
          </div>
        </nav>
      )}
    </>
  );
};

export default NavBar;

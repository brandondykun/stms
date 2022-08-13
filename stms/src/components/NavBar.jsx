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
    <nav className="primary-nav">
      <NavLink to="/home" className="nav-link">
        Home
      </NavLink>

      {accountInfo.is_staff && (
        <NavLink to="/admin/reassign" className="nav-link">
          Admin
        </NavLink>
      )}

      <div className="nav-link" onClick={logOut}>
        Sign Out
      </div>
    </nav>
  );
};

export default NavBar;

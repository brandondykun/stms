import { NavLink, useNavigate } from "react-router-dom";
import apiCalls from "../api/apiUtils";
import { useAuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { currentUser, setCurrentUser } = useAuthContext();

  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await apiCalls.logOut();
      setCurrentUser(null);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="primary-nav">
      {!currentUser && (
        <NavLink to="login" className="nav-link">
          Log In
        </NavLink>
      )}
      {!currentUser && (
        <NavLink to="register" className="nav-link">
          Sign Up
        </NavLink>
      )}
      {currentUser && (
        <NavLink to="home" className="nav-link">
          Home
        </NavLink>
      )}
      {currentUser && (
        <NavLink to="admin" className="nav-link">
          Admin
        </NavLink>
      )}
      {currentUser && (
        <div className="nav-link" onClick={logOut}>
          Sign Out
        </div>
      )}
    </nav>
  );
};

export default NavBar;
<nav className="primary-nav"></nav>;

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import apiCalls from "../api/apiUtils";
import { useAuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setCurrentUser } = useAuthContext();

  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();

    apiCalls
      .logIn(email, password)
      .then((user) => {
        if (user) {
          setCurrentUser(user);
          navigate("/home");
        }
      })
      .catch((error) => {
        console.error(error);
        // handle setting message
      });
  };
  return (
    <div className="primary-content">
      <div className="image-wrapper">
        <img
          className="image-container"
          src="../src/assets/fist-logo.png"
          alt="FIST logo"
        />
      </div>
      <div className="link-container">
        <NavLink className="nav-link" to="/login">
          Log In
        </NavLink>
        <NavLink className="nav-link" to="/register">
          Register
        </NavLink>
      </div>
      <form className="login-form" onSubmit={handleLogIn}>
        <input
          aria-label="email"
          type="text"
          placeholder="email"
          className="dark-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          aria-label="password"
          type="password"
          placeholder="password"
          className="dark-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="form-button login" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

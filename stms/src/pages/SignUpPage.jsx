import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import apiCalls from "../api/apiUtils";
import { useAuthContext } from "../context/AuthContext";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setCurrentUser } = useAuthContext();

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const user = await apiCalls.createUser(email, password);
    if (user) {
      setCurrentUser(user);
      navigate(`/create-account/${user.uid}`);
    }
  };

  return (
    <div className="primary-content login-page">
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
      <form className="form login-form" onSubmit={handleSignUp}>
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
        <input
          aria-label="confirm password"
          type="password"
          placeholder="confirm password"
          className="dark-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="form-button register">Register</button>
      </form>
    </div>
  );
};

export default SignUpPage;

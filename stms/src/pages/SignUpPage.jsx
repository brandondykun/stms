import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import apiCalls from "../api/apiUtils";
import { useAuthContext } from "../context/AuthContext";
import Logo from "../assets/fist-logo.png";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [error, setError] = useState();

  const { setCurrentUser } = useAuthContext();

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Please complete all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const actualJoinCode = await apiCalls.getCurrentJoinCode();
    if (actualJoinCode.data) {
      if (joinCode !== actualJoinCode.data.code) {
        setError("Invalid join code.");
        return;
      }
    } else {
      setError(actualJoinCode.error);
      return;
    }

    const user = await apiCalls.createUser(email, password);
    if (user) {
      setCurrentUser(user);
      navigate(`/create-account/${user.uid}`);
    }
  };

  return (
    <div className="primary-content login-page">
      <div className="image-wrapper">
        <img className="image-container" src={Logo} alt="FIST logo" />
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
        <input
          aria-label="join code"
          type="text"
          placeholder="join code"
          className="dark-input"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
        />
        <div className="form-button-container">
          <button className="form-button register" type="submit">
            Register
          </button>
        </div>
      </form>
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default SignUpPage;

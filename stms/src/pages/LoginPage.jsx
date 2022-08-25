import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import apiCalls from "../api/apiUtils";
import Logo from "../assets/fist-logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please complete all fields.");
      return;
    }

    try {
      const user = await apiCalls.logIn(email, password);
      if (user.status === 400) {
        setError("Login failed. Invalid credentials.");
        return;
      }
      const userInfo = await apiCalls.getAccountByUserId(user.data.uid);

      if (userInfo.found === false) {
        navigate(`/create-account/${user.data.uid}`);
      } else if (userInfo.found === true) {
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      // handle this error
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
      <form className="form login-form" onSubmit={handleLogIn}>
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
        <div className="form-button-container">
          <button className="form-button login" type="submit">
            Log In
          </button>
        </div>
      </form>
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default LoginPage;

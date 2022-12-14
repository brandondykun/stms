import { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import apiCalls from "../api/apiUtils";
import Logo from "../assets/fist-logo.png";
import BarLoader from "react-spinners/BarLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../context/AuthContext"; // added this

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setAccountInfo } = useAuthContext(); // added this

  const handleLogIn = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setSubmitLoading(false);
      setError("Please complete all fields.");
      return;
    }

    setSubmitLoading(true);

    try {
      const user = await apiCalls.logIn(email, password);
      if (user.status === 400) {
        setSubmitLoading(false);
        setError("Login failed. Invalid credentials.");
        setSubmitLoading(false);
        return;
      }
      const userInfo = await apiCalls.getAccountByUserId(user.data.uid);

      if (userInfo.found === false) {
        navigate(`/create-account/${user.data.uid}`);
      } else if (userInfo.found === true) {
        setAccountInfo(userInfo.data);
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      // handle this error
    }
    setSubmitLoading(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
        <div className="input-eye-container">
          <input
            aria-label="password"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            className="dark-input password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FontAwesomeIcon
            className="show-password-eye"
            icon={showPassword ? faEyeSlash : faEye}
            size="1x"
            onClick={toggleShowPassword}
          />
        </div>
        <Link to="/reset-password" className="forgot-password-link">
          Forgot Your Password?
        </Link>
        <div className="form-button-container">
          <button
            className={`form-button register ${
              submitLoading ? "disabled-button" : ""
            }`}
            type="submit"
            disabled={submitLoading}
          >
            Log In
          </button>
        </div>
        <div className="flex-center-center">
          <BarLoader color={"#FEC30A"} loading={submitLoading} height={1} />
        </div>
      </form>
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default LoginPage;

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import apiCalls from "../api/apiUtils";
import { useAuthContext } from "../context/AuthContext";
import Logo from "../assets/fist-logo.png";
import BarLoader from "react-spinners/BarLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [error, setError] = useState();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setCurrentUser } = useAuthContext();

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitLoading(true);

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
      navigate(`/create-account/${user.uid}`);
    }
    setSubmitLoading(false);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
      <form className="form login-form" onSubmit={handleSignUp}>
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
        <div className="input-eye-container">
          <input
            aria-label="confirm password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="confirm password"
            className="dark-input password-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FontAwesomeIcon
            className="show-password-eye"
            icon={showConfirmPassword ? faEyeSlash : faEye}
            size="1x"
            onClick={toggleShowConfirmPassword}
          />
        </div>
        <input
          aria-label="join code"
          type="text"
          placeholder="join code"
          className="dark-input"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
        />
        <div className="form-button-container">
          <button
            className={`form-button register ${
              submitLoading ? "disabled-button" : ""
            }`}
            type="submit"
            disabled={submitLoading}
          >
            Register
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

export default SignUpPage;

import { useState } from "react";
import { Link } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase-config";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    sendPasswordResetEmail(auth, email)
      .then((res) => {
        console.log("EMAIL RESPONSE", res);
        setEmailSent(true);
        setSubmitLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("ERROR: ", errorMessage);
        setSubmitLoading(false);
      });
  };

  return (
    <div className="primary-content login-page">
      <h1 className="page-title">Password Reset</h1>
      {!emailSent ? (
        <div>
          <div className="enter-email-text">
            Enter your email and hit Submit. You will then receive a link to
            reset your password.
          </div>
          <form
            className="form login-form reset-email-form"
            onSubmit={handleSubmit}
          >
            <label htmlFor="email">Email</label>
            <input
              aria-label="email"
              name="email"
              type="email"
              placeholder="youremail@email.com"
              className="dark-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="form-button-container">
              <button
                className={`form-button register ${
                  submitLoading ? "disabled-button" : ""
                }`}
                type="submit"
                disabled={submitLoading}
              >
                Submit
              </button>
            </div>
            <div className="flex-center-center">
              <BarLoader color={"#FEC30A"} loading={submitLoading} height={1} />
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div className="email-confirmation-text">
            Success! An email to reset your password has been sent to {email}.
          </div>
          <div className="email-confirmation-text color-gold">
            CHECK YOUR SPAM/JUNK FOLDER! THE EMAIL WILL MOST LIKELY END UP
            THERE!
          </div>
        </div>
      )}
      <Link to="/login" className="link-text">
        <span className="icon-margin-right">
          <FontAwesomeIcon icon={faAnglesLeft} />
        </span>
        Back to login
      </Link>
    </div>
  );
};

export default ResetPasswordPage;

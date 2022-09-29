import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const TestLandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="primary-content">
      <h1 className="page-title">FIST Written Exam Practice Test</h1>
      <div>
        You are about to start a practice FIST written exam. This is a 50
        question test and scores are not recorded. Click the Start button below
        to start the exam.
      </div>
      <div className="form-button-container">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="form-button login"
        >
          Back
        </button>

        <Link to={`/exam/question/0`}>
          <button className="form-button login">Start</button>
        </Link>
      </div>
    </div>
  );
};

export default TestLandingPage;

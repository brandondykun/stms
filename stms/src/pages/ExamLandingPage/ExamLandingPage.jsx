import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./ExamLandingPage.module.css";

const ExamLandingPage = () => {
  const navigate = useNavigate();

  // If an exam is in progress, start the user on the first incomplete question
  const questionsString = localStorage.getItem("questions");
  let firstIncompleteIndex = 0;
  let testHasBeenStarted = false;

  let testType = "full-exam";

  if (questionsString) {
    const questions = JSON.parse(questionsString);
    if (questions.length === 10) {
      testType = "quick-ten";
    }

    const isIncomplete = (element) => !element.complete;
    const firstIndex = questions.findIndex(isIncomplete);

    if (firstIndex === -1) {
      localStorage.removeItem("questions");
    } else {
      firstIncompleteIndex = firstIndex;
      testHasBeenStarted = true;
    }
  }

  return (
    <div className="primary-content">
      <h1 className="page-title">FIST Written Exam Practice Test</h1>
      <div data-cy="exam-paragraph" className={styles.descriptionText}>
        You are about to start a practice FIST Certification written exam. You
        have unlimited guesses for each question, but if you get the question
        wrong on the first guess, it will be counted as an incorrect answer in
        your test results. You will be able to see a list of questions that you
        missed in the results section. This test is for you to practice, and the
        results will not be shared with your leadership.
      </div>
      <div data-cy="exam-start-text" className={styles.startText}>
        {!testHasBeenStarted
          ? "Click the Start button below to start the Full exam."
          : "You currently have an exam in progress. Click the Resume button below to continue."}
      </div>
      <div className="form-button-container">
        <button
          onClick={() => {
            navigate(-1);
          }}
          data-cy="back-button"
          className="form-button login"
        >
          Back
        </button>

        <Link to={`/exam/${testType}/question/${firstIncompleteIndex}`}>
          <button data-cy="start-resume-button" className="form-button login">
            {!testHasBeenStarted ? "Start" : "Resume"}
          </button>
        </Link>
      </div>
      {!testHasBeenStarted && (
        <div>
          <div data-cy="quick-10-text" className={styles.startText}>
            Don't want to do a full test? Hit a quick 10 random questions.
          </div>
          <div className="form-button-container">
            <Link to={`/exam/quick-ten/question/${firstIncompleteIndex}`}>
              <button data-cy="quick-10-button" className="form-button login">
                Quick 10
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamLandingPage;

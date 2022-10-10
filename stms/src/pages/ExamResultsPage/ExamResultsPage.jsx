import { useEffect, useState } from "react";
import styles from "./ExamResultsPage.module.css";
import { useNavigate } from "react-router-dom";

const ExamResultsPage = () => {
  const [results, setResults] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setResults(JSON.parse(localStorage.getItem("questions")));
  }, []);

  const numberOfQuestions = results?.length;
  const incorrectQuestions = results?.filter((question) => {
    return question.guess !== question.answer_text;
  });

  let numberCorrect = "";
  if (results) {
    numberCorrect = numberOfQuestions - incorrectQuestions.length;
  }

  const percent = numberCorrect / numberOfQuestions;

  const handleExit = () => {
    localStorage.removeItem("questions");
    navigate("/home");
  };

  return (
    <div className="primary-content">
      <h1 className={styles.pageTitle}>Exam Results</h1>
      <div className={styles.resultsSummaryText}>
        You got {numberCorrect} out of {numberOfQuestions} questions correct.
      </div>
      <div className={styles.percentContainer}>
        {(percent * 100).toFixed(0)}%
      </div>

      <div className={styles.textAndButtonContainer}>
        {incorrectQuestions?.length > 0 && (
          <div className={styles.buttonContainer}>
            <button onClick={handleExit} className={styles.button}>
              Exit Exam
            </button>
          </div>
        )}

        {incorrectQuestions?.length > 0 ? (
          <div className={styles.questionsTitle}>
            Here are the questions you need to work on:
          </div>
        ) : (
          <div className={styles.resultsSummaryText}>
            Good work. You made that look easy.
          </div>
        )}
      </div>
      {incorrectQuestions?.map((question) => {
        return (
          <div className={styles.container} key={question.id}>
            <div className={styles.questionContainer}>
              <div className={styles.questionText}>{question.question}</div>
              <div className={styles.optionsContainer}>
                {question.options.map((option) => {
                  const conditionalClass =
                    option === question.guess
                      ? styles.wrongGuess
                      : option === question.answer_text
                      ? styles.correctAnswer
                      : styles.otherOption;
                  return (
                    <div className={conditionalClass} key={option}>
                      {option}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
      <div className={styles.buttonContainer}>
        <button onClick={handleExit} className={styles.button}>
          Exit Exam
        </button>
      </div>
    </div>
  );
};

export default ExamResultsPage;

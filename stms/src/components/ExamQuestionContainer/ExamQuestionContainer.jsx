import { useState } from "react";
import { useEffect } from "react";
import styles from "./ExamQuestionContainer.module.css";

const ExamQuestionContainer = ({
  activeQuestion,
  answerCorrect,
  answerSubmitted,
  handleNextClick,
  handleSelect,
  handleSubmit,
  handleTestFinish,
  qid,
  questions,
  selectedAnswer,
}) => {
  const [opacityState, setOpacityState] = useState(0);
  const getClassName = (opt) => {
    let conditionalClass =
      selectedAnswer === opt
        ? styles.optionContainerSelected
        : styles.optionContainer;
    if (answerSubmitted) {
      if (opt === selectedAnswer) {
        if (opt === activeQuestion.answer_text) {
          conditionalClass = styles.optionContainerGreen;
        } else {
          conditionalClass = styles.optionContainerRed;
        }
      }
    }
    return conditionalClass;
  };

  useEffect(() => {
    setTimeout(() => {
      if (opacityState < 1) {
        const newOpacity = opacityState + 0.05;
        setOpacityState(newOpacity);
      }
    }, 25);
  }, [opacityState]);

  return (
    <div
      data-cy="question-container"
      className={styles.questionContainer}
      style={{ opacity: opacityState }}
    >
      <div data-cy="question-text" className={styles.questionTextContainer}>
        {activeQuestion.question}
      </div>
      {activeQuestion.options.map((option, index) => {
        return (
          <div
            data-cy={`option-${index}`}
            key={option}
            className={getClassName(option)}
            onClick={() => handleSelect(option)}
          >
            {option}
          </div>
        );
      })}
      <div
        data-cy="feedback-text"
        className={
          answerCorrect
            ? styles.feedbackContainerCorrect
            : styles.feedbackContainerIncorrect
        }
      >
        {!answerSubmitted
          ? null
          : answerCorrect
          ? "Correct"
          : "Incorrect. Try again."}
      </div>
      <div className={styles.buttonContainer}>
        <button
          data-cy="submit-button"
          onClick={handleSubmit}
          className={styles.screenButton}
          disabled={
            !selectedAnswer ? true : answerSubmitted ? true : answerCorrect
          }
        >
          Submit
        </button>
        {qid < questions.length - 1 && (
          <button
            data-cy="next-button"
            className={styles.screenButton}
            disabled={!answerCorrect}
            onClick={handleNextClick}
          >
            Next Question
          </button>
        )}
        {qid == questions.length - 1 && (
          <button
            data-cy="results-button"
            className={styles.screenButton}
            disabled={!answerCorrect}
            onClick={handleTestFinish}
          >
            View Results
          </button>
        )}
      </div>
    </div>
  );
};

export default ExamQuestionContainer;

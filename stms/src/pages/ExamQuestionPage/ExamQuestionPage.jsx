import { useEffect } from "react";
import apiCalls from "../../api/apiUtils";
import { useParams } from "react-router-dom";
import { useState } from "react";
import styles from "./ExamQuestionPage.module.css";
import { useNavigate } from "react-router-dom";

const ExamQuestionPage = () => {
  const [questions, setQuestions] = useState(null);
  // const [activeQuestion, setActiveQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const { qid } = useParams();

  const navigate = useNavigate();

  const activeQuestion = questions && questions[qid];

  useEffect(() => {
    apiCalls.getQuestions().then((res) => {
      if (res.status === 200) {
        console.log("DATA: ", res.data);
        localStorage.setItem("questions", JSON.stringify(res.data));
        setQuestions(res.data);
      }
    });
  }, []);

  useEffect(() => {
    setFeedback(null);
    setSelectedAnswer(null);
    // if (questions) {
    //   setActiveQuestion(questions[qid]);
    // }
  }, [qid, questions]);

  const handleSelect = (option) => {
    setFeedback(null);
    setSelectedAnswer(option);
  };

  const handleSubmit = () => {
    if (!activeQuestion.guess) {
      activeQuestion.guess = selectedAnswer;
      localStorage.setItem("questions", JSON.stringify(questions));
    }
    if (selectedAnswer === activeQuestion.answer_text) {
      activeQuestion.complete = true;
      localStorage.setItem("questions", JSON.stringify(questions));
      setFeedback("Correct");
    } else {
      setFeedback("Incorrect");
    }
  };

  const handleNextClick = () => {
    navigate(`/exam/question/${Number(qid) + 1}`);
  };

  const handleTestFinish = () => {
    alert("I still need to develop this.");
  };

  return (
    <div className="primary-content">
      {console.log("questions: ", questions)}
      <div className={styles.examContainer}>
        <h1 className={styles.pageTitle}>
          Question {Number(qid) + 1} of {questions && questions.length}
        </h1>
        {activeQuestion && (
          <div>
            <div className={styles.questionContainer}>
              {activeQuestion.question}
            </div>
            {activeQuestion.options.map((option) => {
              return (
                <div
                  key={option}
                  className={
                    selectedAnswer === option
                      ? styles.optionContainerSelected
                      : styles.optionContainer
                  }
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </div>
              );
            })}
            <div
              className={
                feedback === "Correct"
                  ? styles.feedbackContainerCorrect
                  : styles.feedbackContainerIncorrect
              }
            >
              {feedback}
            </div>
            <div className={styles.buttonContainer}>
              <button
                onClick={handleSubmit}
                className={styles.button}
                disabled={!selectedAnswer ? true : feedback === "Correct"}
              >
                Submit
              </button>
              {qid < questions.length - 1 && (
                <button
                  className={styles.button}
                  disabled={feedback === "Correct" ? false : true}
                  onClick={handleNextClick}
                >
                  Next Question
                </button>
              )}
              {qid == questions.length - 1 && (
                <button
                  className={styles.button}
                  disabled={feedback === "Correct" ? false : true}
                  onClick={handleTestFinish}
                >
                  Finish Test
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamQuestionPage;

import { useEffect } from "react";
import apiCalls from "../../api/apiUtils";
import { useParams } from "react-router-dom";
import { useState } from "react";
import styles from "./ExamQuestionPage.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import PulseLoader from "react-spinners/BeatLoader";

const ExamQuestionPage = () => {
  const [questions, setQuestions] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [questionComplete, setQuestionComplete] = useState(false);
  const [pending, setPending] = useState(false);

  const { type, qid } = useParams();

  const navigate = useNavigate();

  const { accountInfo } = useAuthContext();

  const activeQuestion = questions && questions[qid];

  useEffect(() => {
    if (localStorage.getItem("questions") === null) {
      setPending(true);
      setTimeout(() => {
        apiCalls.getQuestions().then((res) => {
          if (res.status === 200) {
            // randomize the order of the questions
            const randomOrderArray = res.data.sort(() => 0.5 - Math.random());
            console.log("RANDOM ORDER ARRAY: ", randomOrderArray);
            const finalQuestions =
              type === "quick-ten"
                ? randomOrderArray.slice(0, 10)
                : randomOrderArray;
            localStorage.setItem("questions", JSON.stringify(finalQuestions));
            setQuestions(finalQuestions);
            setPending(false);
          }
        });
      }, 3000);
    } else {
      setQuestions(JSON.parse(localStorage.getItem("questions")));
    }
  }, []);

  useEffect(() => {
    setAnswerSubmitted(false);
    setAnswerCorrect(false);
    setSelectedAnswer(null);
    setQuestionComplete(false);
  }, [qid, questions]);

  const handleSelect = (option) => {
    if (questionComplete) return;
    setAnswerSubmitted(false);
    setAnswerCorrect(false);
    setSelectedAnswer(option);
  };

  const handleSubmit = () => {
    setAnswerSubmitted(true);
    if (!activeQuestion.guess) {
      activeQuestion.guess = selectedAnswer;
      localStorage.setItem("questions", JSON.stringify(questions));
    }
    if (selectedAnswer === activeQuestion.answer_text) {
      setQuestionComplete(true);
      activeQuestion.complete = true;
      localStorage.setItem("questions", JSON.stringify(questions));
      setAnswerCorrect(true);
    } else {
      setAnswerCorrect(false);
    }
  };

  const handleNextClick = () => {
    setAnswerCorrect(false);
    setAnswerSubmitted(false);
    navigate(`/exam/${type}/question/${Number(qid) + 1}`);
  };

  const handleTestFinish = () => {
    navigate("/exam/results");
  };

  // Determine the class name for the option container to display the border correctly
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

  return (
    <div className="primary-content">
      {/* {console.log("questions: ", questions)} */}
      {activeQuestion ? (
        <div className={styles.examContainer}>
          <h1 className={styles.pageTitle}>
            Question {Number(qid) + 1} of {questions && questions.length}
          </h1>

          <div className={styles.questionContainer}>
            <div className={styles.questionTextContainer}>
              {activeQuestion.question}
            </div>
            {activeQuestion.options.map((option) => {
              return (
                <div
                  key={option}
                  className={getClassName(option)}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </div>
              );
            })}
            <div
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
                onClick={handleSubmit}
                className={styles.button}
                disabled={
                  !selectedAnswer
                    ? true
                    : answerSubmitted
                    ? true
                    : answerCorrect
                }
              >
                Submit
              </button>
              {qid < questions.length - 1 && (
                <button
                  className={styles.button}
                  disabled={!answerCorrect}
                  onClick={handleNextClick}
                >
                  Next Question
                </button>
              )}
              {qid == questions.length - 1 && (
                <button
                  className={styles.button}
                  disabled={!answerCorrect}
                  onClick={handleTestFinish}
                >
                  View Results
                </button>
              )}
            </div>
          </div>
        </div>
      ) : pending ? (
        <div className={styles.loadingContainer}>
          <div className={styles.preText}>
            Okay {accountInfo.last_name}. Let's see what you got.
          </div>
          <div className={styles.spinner}>
            <PulseLoader color={"#FEC30A"} loading={pending} size={20} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ExamQuestionPage;

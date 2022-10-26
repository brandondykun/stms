import { useEffect } from "react";
import apiCalls from "../../api/apiUtils";
import { useParams } from "react-router-dom";
import { useState } from "react";
import styles from "./ExamQuestionPage.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import PulseLoader from "react-spinners/BeatLoader";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import ExamQuestionContainer from "../../components/ExamQuestionContainer/ExamQuestionContainer";

const ExamQuestionPage = () => {
  const [questions, setQuestions] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [questionComplete, setQuestionComplete] = useState(false);
  const [pending, setPending] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { type, qid } = useParams();

  const navigate = useNavigate();

  const { accountInfo } = useAuthContext();

  const activeQuestion = questions && questions[qid];

  useEffect(() => {
    if (localStorage.getItem("questions") === null) {
      setPending(true);
      const environment = import.meta.env.VITE_ENVIRONMENT;
      setTimeout(() => {
        apiCalls.getQuestions().then((res) => {
          if (res.status === 200) {
            let questionArray = res.data.sort((a, b) => a.id - b.id);
            // randomize the order of the questions if in prod
            if (environment !== "dev") {
              questionArray = res.data.sort(() => 0.5 - Math.random());
            }
            const finalQuestions =
              type === "quick-ten" ? questionArray.slice(0, 10) : questionArray;
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
    window.scrollTo(0, 0);
  }, [qid, questions]);

  const handleSelect = (option) => {
    if (questionComplete) return;
    setAnswerSubmitted(false);
    setAnswerCorrect(false);
    setSelectedAnswer(option);
  };

  const handleSubmit = () => {
    setAnswerSubmitted(true);
    const activeIndex = questions.indexOf(activeQuestion);

    if (!activeQuestion.guess) {
      const questionsCopy = [...questions];
      questionsCopy[activeIndex].guess = selectedAnswer;
      localStorage.setItem("questions", JSON.stringify(questionsCopy));
    }
    if (selectedAnswer === activeQuestion.answer_text) {
      setQuestionComplete(true);
      setAnswerCorrect(true);
      const questionsCopy = [...questions];
      questionsCopy[activeIndex].complete = true;
      localStorage.setItem("questions", JSON.stringify(questionsCopy));
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
    window.scrollTo(0, 0);
    navigate("/exam/results");
  };

  const handleExamExit = () => {
    localStorage.removeItem("questions");
    navigate("/home");
  };

  return (
    <>
      <Modal
        show={showModal}
        data-cy="main-modal"
        dialogClassName={styles.modalDialog}
        size="lg"
        onHide={() => setShowModal(false)}
        backdropClassName={styles.modalBackdrop}
      >
        <Modal.Header
          closeButton
          className={styles.modalHeader}
          closeVariant="white"
        >
          <Modal.Title className={styles.modalTitle}>Check Fire!!</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBg}>
          You are about to exit the exam, and your progress will not be saved.
          Are you sure you want to do this?
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <button
            data-cy="modal-continue-button"
            className={styles.modalButton}
            onClick={() => setShowModal(false)}
          >
            Continue Exam
          </button>
          <button
            data-cy="modal-exit-button"
            className={styles.modalButton}
            onClick={handleExamExit}
          >
            Exit Exam
          </button>
        </Modal.Footer>
      </Modal>
      <div className={styles.examPrimaryContent}>
        {activeQuestion ? (
          <div className={styles.examContainer}>
            <h1 data-cy="question-number-message" className={styles.pageTitle}>
              Question {Number(qid) + 1} of {questions && questions.length}
            </h1>

            <ExamQuestionContainer
              key={qid}
              activeQuestion={activeQuestion}
              answerCorrect={answerCorrect}
              answerSubmitted={answerSubmitted}
              handleNextClick={handleNextClick}
              handleSelect={handleSelect}
              handleSubmit={handleSubmit}
              handleTestFinish={handleTestFinish}
              qid={qid}
              questions={questions}
              selectedAnswer={selectedAnswer}
            />

            <div className={styles.bottomButtonContainer}>
              <button
                data-cy="exit-exam-button"
                className={styles.bottomExitButton}
                onClick={() => setShowModal(true)}
              >
                <FontAwesomeIcon icon={faCircleXmark} size="sm" />{" "}
                <span className={styles.exitText}>Exit Exam</span>
              </button>
            </div>
          </div>
        ) : pending ? (
          <div data-cy="loading-display" className={styles.loadingContainer}>
            <div className={styles.preText}>
              Okay {accountInfo.last_name}. Let's see what you got.
            </div>
            <div className={styles.spinner}>
              <PulseLoader color={"#FEC30A"} loading={pending} size={20} />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ExamQuestionPage;

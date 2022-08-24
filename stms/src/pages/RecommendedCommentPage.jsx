import { useState } from "react";
import apiCalls from "../api/apiUtils";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import CommentForm from "../components/CommentForm";
import utils from "../utils/utils";

const formTemplate = {
  category: "CHARACTER",
  commentor_id: "",
  text: "",
  timestamp: "",
  user_id: "",
};

const RecommendedCommentPage = () => {
  const [formInputs, setFormInputs] = useState(formTemplate);
  const [error, setError] = useState();

  const { currentUser } = useAuthContext();

  const { id } = useParams();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formInputs.text) {
      setError("Please enter a comment.");
      return;
    }

    const now = new Date();
    const time = utils.getTimeStamp(now);
    const data = {
      ...formInputs,
      category: "RECOMMENDED",
      timestamp: time,
      commentor_id: id,
      user_id: id,
    };

    apiCalls
      .addComment(data)
      .then((res) => {
        if (!res.error) {
          navigate(`/comments/${id}`);
        }
      })
      .catch((error) => console.error(error));
    // need to handle this error
  };

  return (
    <div className="primary-content">
      <h1 className="page-title name-title">Add Comment</h1>
      <CommentForm
        recommendedComment={true}
        formInputs={formInputs}
        setFormInputs={setFormInputs}
        handleSubmit={handleSubmit}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default RecommendedCommentPage;

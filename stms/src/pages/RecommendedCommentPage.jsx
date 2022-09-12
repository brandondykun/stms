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
  const [submitLoading, setSubmitLoading] = useState(false);

  const { currentUser } = useAuthContext();

  const { id } = useParams();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
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

    try {
      const res = await apiCalls.addComment(data);
      if (!res.error) {
        navigate(`/comments/${id}`);
      }
    } catch (error) {
      console.error(error);
    }
    setSubmitLoading(false);
  };

  return (
    <div className="primary-content">
      <h1 className="page-title name-title">Add Comment</h1>
      <CommentForm
        recommendedComment={true}
        formInputs={formInputs}
        setFormInputs={setFormInputs}
        handleSubmit={handleSubmit}
        loading={submitLoading}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default RecommendedCommentPage;

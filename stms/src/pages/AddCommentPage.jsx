import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiCalls from "../api/apiUtils";
import { useAuthContext } from "../context/AuthContext";
import utils from "../utils/utils";
import CommentForm from "../components/CommentForm";

const formTemplate = {
  category: "CHARACTER",
  commentor_id: "",
  text: "",
  timestamp: "",
  user_id: "",
};

const AddCommentPage = () => {
  const [formInputs, setFormInputs] = useState(formTemplate);
  const [error, setError] = useState();
  const [submitLoading, setSubmitLoading] = useState(false);

  const { currentUser, accountInfo } = useAuthContext();

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
    try {
      const now = new Date();
      const time = utils.getTimeStamp(now);
      const data = {
        ...formInputs,
        timestamp: time,
        commentor_id: accountInfo.id,
        user_id: id,
      };

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
        formInputs={formInputs}
        setFormInputs={setFormInputs}
        handleSubmit={handleSubmit}
        loading={submitLoading}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default AddCommentPage;

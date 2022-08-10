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

  const { currentUser, setCurrentUser } = useAuthContext();

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
      timestamp: time,
      commentor_id: currentUser.uid,
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
        formInputs={formInputs}
        setFormInputs={setFormInputs}
        handleSubmit={handleSubmit}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default AddCommentPage;

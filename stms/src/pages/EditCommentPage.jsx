import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiCalls from "../api/apiUtils";
import CommentForm from "../components/CommentForm";

const formTemplate = {
  category: "",
  commentor_id: "",
  text: "",
  timestamp: "",
  user_id: "",
};

const EditComment = () => {
  const [formInputs, setFormInputs] = useState(formTemplate);
  const [error, setError] = useState();

  const { id, cid } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    apiCalls.getComment(cid).then((res) => {
      if (!res.error) {
        setFormInputs(res);
      }
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!formInputs.text) {
      setError("Please enter a comment.");
      return;
    }

    apiCalls
      .editComment(cid, formInputs)
      .then((res) => {
        if (res.status === 200) {
          navigate(`/comments/${id}`);
        }
      })
      .catch((error) => console.error(error));
    // need to handle this error
  };

  return (
    <div className="primary-content">
      <h1 className="page-title name-title">Edit Comment</h1>
      <CommentForm
        formInputs={formInputs}
        setFormInputs={setFormInputs}
        handleSubmit={handleSubmit}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default EditComment;

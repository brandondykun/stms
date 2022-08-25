import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiCalls from "../api/apiUtils";
import CommentForm from "../components/CommentForm";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../context/AuthContext";

const formTemplate = {
  category: "",
  commentor_id: "",
  text: "",
  timestamp: "",
  user_id: "",
};

const EditRecommendedCommentPage = () => {
  const [formInputs, setFormInputs] = useState(formTemplate);
  const [error, setError] = useState();

  const { accountInfo } = useAuthContext();

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
      <div className="title-link-container">
        <h1 className="page-title name-title">Edit Comment</h1>

        <Link
          to={
            accountInfo.id === id
              ? `/comments/${id}/edit/${cid}/delete-recommended-comment`
              : `/comments/${id}/edit/${cid}/delete`
          }
          className="comments-link"
        >
          Delete Comment
          <span className="icon-margin-left">
            <FontAwesomeIcon icon={faTrashAlt} size="sm" />
          </span>
        </Link>
      </div>

      <CommentForm
        formInputs={formInputs}
        setFormInputs={setFormInputs}
        handleSubmit={handleSubmit}
        recommendedComment={true}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default EditRecommendedCommentPage;

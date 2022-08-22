import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import apiCalls from "../api/apiUtils";
import { useState } from "react";

const DeleteCommentPage = () => {
  const [comment, setComment] = useState();
  const [error, setError] = useState();

  const { id, cid } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    apiCalls
      .getComment(cid)
      .then((res) => {
        if (!res.error) {
          setComment(res);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleClick = () => {
    apiCalls
      .deleteComment(cid)
      .then((res) => {
        if (!res.error) {
          navigate(`/comments/${id}`);
        } else {
          setError("There was a problem deleting that comment.");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="primary-content">
      <h1 className="page-title name-title">Delete Comment</h1>
      <h2 className="centered-text font-size-15 color-gold">
        Are you sure you want to delete this comment?
      </h2>

      <div className="centered-text padding-tb-20 font-size-12">
        <span className="gold-title">Comment:</span> {comment?.text}
      </div>
      <div className="form-button-container">
        <Link to={`/comments/${id}/edit/${cid}`}>
          <button className="form-button login" type="button">
            Abort
          </button>
        </Link>
        <button className="form-button login" onClick={handleClick}>
          Send It
        </button>
      </div>
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default DeleteCommentPage;

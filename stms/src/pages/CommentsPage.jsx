import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import apiCalls from "../api/apiUtils";
import CommentsContainer from "../components/CommentsContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../context/AuthContext";

const CommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState([]);

  const { id } = useParams();

  const { accountInfo } = useAuthContext();

  useEffect(() => {
    const getUserAndComments = async (id) => {
      try {
        const user = await apiCalls.getUser(id);
        const comments = await apiCalls.getComments(id);
        if (user.found) {
          setUser(user.data);
        }
        if (!comments.error) {
          setComments(comments);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUserAndComments(id);
  }, []);

  const pageTitle =
    accountInfo.id === id
      ? "My Comments"
      : ` Comments for ${user?.rank} ${user?.last_name}`;

  return (
    <div className="primary-content">
      <div className="title-link-container">
        <h1 className="page-title name-title">{pageTitle}</h1>
        {accountInfo.is_staff && accountInfo.id !== id && (
          <Link to={`/comments/${id}/create`} className="comments-link">
            Add Comment
            <span className="icon-margin-left">
              <FontAwesomeIcon icon={faPlus} />
            </span>
          </Link>
        )}
      </div>

      <Link to={`/user-info/${id}`} className="comments-link fit-link">
        <div className="edit-button-container">
          <span className="icon-margin-right">
            <FontAwesomeIcon icon={faAnglesLeft} />
          </span>
          Back
        </div>
      </Link>
      <div className="all-comments-container">
        <CommentsContainer comments={comments} category={"CHARACTER"} />
        <CommentsContainer comments={comments} category={"PRESENCE"} />
        <CommentsContainer comments={comments} category={"INTELLECT"} />
        <CommentsContainer comments={comments} category={"LEADERSHIP"} />
        <CommentsContainer comments={comments} category={"DEVELOPS"} />
        <CommentsContainer comments={comments} category={"ACHIEVES"} />
        <CommentsContainer comments={comments} category={"OVERALL"} />
        <CommentsContainer comments={comments} category={"RECOMMENDED"} />
      </div>

      {accountInfo && accountInfo.id === id && (
        <div>
          <div className="text-align-center">
            Know something we don't? Add a recommended comment for your
            leadership.
          </div>

          <div className="form-button-container">
            <Link
              to={`/comments/${id}/add-recommended-comment`}
              className="comments-link"
            >
              <button className="form-button login" type="submit">
                Add Recommended Comment
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsPage;

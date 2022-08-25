import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const CommentsContainer = ({ comments, category }) => {
  const [filteredComments, setFilteredComments] = useState();

  const { currentUser, accountInfo } = useAuthContext();

  useEffect(() => {
    setFilteredComments(
      comments
        ?.filter((comment) => {
          return comment.category === category;
        })
        .sort((a, b) => {
          return a.timestamp.seconds - b.timestamp.seconds;
        })
    );
  }, [comments]);

  return (
    <div className="comments-container">
      <h2 className="section-title info-title">{category}</h2>
      <ul className="comments-list">
        {filteredComments?.length > 0 ? (
          filteredComments.map((comment) => {
            return (
              <li className="comment-container" key={comment.id}>
                {comment.text}
                {accountInfo.id === comment.commentor_id && (
                  <Link
                    className="edit-link"
                    to={
                      comment.category === "RECOMMENDED"
                        ? `/comments/${comment.user_id}/edit-recommended/${comment.id}`
                        : `/comments/${comment.user_id}/edit/${comment.id}`
                    }
                  >
                    -edit
                  </Link>
                )}
              </li>
            );
          })
        ) : (
          <li className="comment-container no-comment">no comments yet</li>
        )}
      </ul>
    </div>
  );
};

export default CommentsContainer;

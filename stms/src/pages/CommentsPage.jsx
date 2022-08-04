import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import apiCalls from "../api/apiUtils";
import CommentsContainer from "../components/CommentsContainer";
import { Link } from "react-router-dom";

const CommentsPage = () => {
  const [comments, setComments] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    apiCalls
      .getComments(id)
      .then((res) => {
        if (!res.error) {
          setComments(res);
        }
      })
      .catch((error) => console.error("ERROR: ", error.error));
    //handle this error
  }, []);

  return (
    <div className="primary-content">
      <div className="title-link-container">
        <h1 className="page-title name-title">Comments</h1>
        <Link to={`/add-comment/${id}`} className="comments-link">
          Add Comment
        </Link>
      </div>
      <div className="all-comments-container">
        <CommentsContainer comments={comments} category={"CHARACTER"} />
        <CommentsContainer comments={comments} category={"PRESENCE"} />
        <CommentsContainer comments={comments} category={"INTELLECT"} />
        <CommentsContainer comments={comments} category={"LEADERSHIP"} />
        <CommentsContainer comments={comments} category={"DEVELOPS"} />
        <CommentsContainer comments={comments} category={"ACHIEVES"} />
        <CommentsContainer comments={comments} category={"OVERALL"} />
      </div>
    </div>
  );
};

export default CommentsPage;

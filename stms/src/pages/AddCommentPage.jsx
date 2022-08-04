import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiCalls from "../api/apiUtils";
import { useAuthContext } from "../context/AuthContext";
import utils from "../utils/utils";

const formTemplate = {
  category: "",
  commentor_id: "",
  text: "",
  timestamp: "",
  user_id: "",
};

const AddCommentPage = () => {
  const [formInputs, setFormInputs] = useState(formTemplate);

  const { currentUser, setCurrentUser } = useAuthContext();

  const { id } = useParams();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

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
        console.log("RESPONSE ADD COMMENT: ", res);
        if (!res.error) {
          navigate(`/comments/${id}`);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="primary-content">
      <h1 className="page-title name-title">Add Comment</h1>
      <form onSubmit={handleSubmit} className="form add-comment-form">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          id="category"
          aria-label="category"
          type="text"
          className="dark-input with-label"
          value={formInputs.category}
          onChange={(e) =>
            setFormInputs({ ...formInputs, category: e.target.value })
          }
        >
          <option value="" disabled selected>
            Category
          </option>
          <option value="CHARACTER">CHARACTER</option>
          <option value="PRESENCE">PRESENCE</option>
          <option value="INTELLECT">INTELLECT</option>
          <option value="LEADERSHIP">LEADERSHIP</option>
          <option value="DEVELOPS">DEVELOPS</option>
          <option value="ACHIEVES">ACHIEVES</option>
          <option value="OVERALL">OVERALL</option>
        </select>

        <textarea
          className="text-area-input"
          maxLength={250}
          placeholder={"Comment..."}
          rows={6}
          type="text"
          value={formInputs.text}
          onChange={(e) =>
            setFormInputs({ ...formInputs, text: e.target.value })
          }
        />
        <button className="form-button login" type="submit">
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default AddCommentPage;

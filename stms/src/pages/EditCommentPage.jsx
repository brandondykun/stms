import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import apiCalls from "../api/apiUtils";
import { useNavigate } from "react-router-dom";

const formTemplate = {
  category: "",
  commentor_id: "",
  text: "",
  timestamp: "",
  user_id: "",
};

const EditComment = () => {
  const [formInputs, setFormInputs] = useState(formTemplate);
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
          {/* <option value="" disabled selected>
            Category
          </option> */}
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

export default EditComment;

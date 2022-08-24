import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const CommentForm = ({
  formInputs,
  setFormInputs,
  handleSubmit,
  recommendedComment = false,
}) => {
  const { id } = useParams();

  return (
    <form onSubmit={handleSubmit} className="form add-comment-form">
      {!recommendedComment && (
        <div className="select-wrapper">
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
            <option value="CHARACTER">CHARACTER</option>
            <option value="PRESENCE">PRESENCE</option>
            <option value="INTELLECT">INTELLECT</option>
            <option value="LEADERSHIP">LEADERSHIP</option>
            <option value="DEVELOPS">DEVELOPS</option>
            <option value="ACHIEVES">ACHIEVES</option>
            <option value="OVERALL">OVERALL</option>
          </select>
          <div className="select-custom-icon">
            <FontAwesomeIcon icon={faAngleDown} size="lg" />
          </div>
        </div>
      )}

      <textarea
        className="text-area-input"
        maxLength={250}
        placeholder={"Comment..."}
        rows={6}
        type="text"
        value={formInputs.text}
        onChange={(e) => setFormInputs({ ...formInputs, text: e.target.value })}
      />
      <div className="form-button-container">
        <Link to={`/comments/${id}`}>
          <button className="form-button login" type="button">
            Cancel
          </button>
        </Link>
        <button className="form-button login" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CommentForm;

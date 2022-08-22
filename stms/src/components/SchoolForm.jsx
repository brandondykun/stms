import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

const SchoolForm = ({ formInputs, setFormInputs, handleSubmit }) => {
  const { id } = useParams();

  return (
    <form onSubmit={handleSubmit} className="form add-comment-form">
      <div className="select-wrapper">
        <label htmlFor="school-name" className="form-label">
          School Name
        </label>
        <select
          id="school-name"
          aria-label="school name"
          type="text"
          className="dark-input with-label"
          value={formInputs.school_name}
          onChange={(e) =>
            setFormInputs({ ...formInputs, school_name: e.target.value })
          }
        >
          <option value="BLC">BLC</option>
          <option value="ALC">ALC</option>
          <option value="SLC">SLC</option>
          <option value="JFO">JFO</option>
          <option value="AIR ASSAULT">AIR ASSAULT</option>
          <option value="PATHFINDER">PATHFINDER</option>
          <option value="RANGER">RANGER</option>
        </select>
        <div className="select-custom-icon">
          <FontAwesomeIcon icon={faAngleDown} size="lg" />
        </div>
      </div>

      <label htmlFor="start-date" className="form-label">
        Start Date
      </label>
      <input
        id="start-date"
        aria-label="start date"
        type="date"
        className="dark-input with-label"
        value={dayjs(formInputs.start_date).format("YYYY-MM-DD")}
        onChange={(e) =>
          setFormInputs({ ...formInputs, start_date: e.target.value })
        }
      />

      <label htmlFor="end-date" className="form-label">
        End Date
      </label>
      <input
        id="end-date"
        aria-label="end date"
        type="date"
        className="dark-input with-label"
        value={dayjs(formInputs.end_date).format("YYYY-MM-DD")}
        onChange={(e) =>
          setFormInputs({ ...formInputs, end_date: e.target.value })
        }
      />

      <div className="form-button-container">
        <Link to={`/user-info/${id}`}>
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

export default SchoolForm;

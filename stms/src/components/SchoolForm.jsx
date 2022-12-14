import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCalendar } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import BarLoader from "react-spinners/BarLoader";

const SchoolForm = ({ formInputs, setFormInputs, handleSubmit, loading }) => {
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

      <div className="select-wrapper">
        <label htmlFor="start-date" className="form-label">
          Start Date
        </label>
        <input
          id="start-date"
          aria-label="start date"
          type="date"
          className="dark-input with-label"
          required
          value={dayjs(formInputs.start_date).format("YYYY-MM-DD")}
          onChange={(e) =>
            setFormInputs({ ...formInputs, start_date: e.target.value })
          }
        />
        <div className="select-custom-icon">
          <FontAwesomeIcon icon={faCalendar} size="1x" />
        </div>
      </div>

      <div className="select-wrapper">
        <label htmlFor="end-date" className="form-label">
          End Date
        </label>
        <input
          id="end-date"
          aria-label="end date"
          type="date"
          required
          className="dark-input with-label"
          value={dayjs(formInputs.end_date).format("YYYY-MM-DD")}
          onChange={(e) =>
            setFormInputs({ ...formInputs, end_date: e.target.value })
          }
        />
        <div className="select-custom-icon">
          <FontAwesomeIcon icon={faCalendar} size="1x" />
        </div>
      </div>

      <div className="form-button-container">
        <Link to={`/user-info/${id}`}>
          <button
            className={`form-button login ${loading ? "disabled-button" : ""}`}
            type="button"
            disabled={loading}
          >
            Cancel
          </button>
        </Link>
        <button
          className={`form-button login ${loading ? "disabled-button" : ""}`}
          type="submit"
          disabled={loading}
        >
          {!loading ? "Submit" : "Loading..."}
        </button>
      </div>
      <div className="flex-center-center">
        <BarLoader color={"#FEC30A"} loading={loading} height={1} />
      </div>
    </form>
  );
};

export default SchoolForm;

import { useState, useEffect } from "react";
import apiCalls from "../api/apiUtils";
import { useNavigate, useParams, Link } from "react-router-dom";
import SchoolForm from "../components/SchoolForm";
import utils from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const formTemplate = {
  school_name: "BLC",
  start_date: "",
  end_date: "",
  id: "",
};

const EditSchoolPage = () => {
  const [user, setUser] = useState();
  const [formInputs, setFormInputs] = useState(formTemplate);
  const [error, setError] = useState();

  const { id, sid } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    apiCalls.getUser(id).then((user) => {
      if (user.found) {
        setUser(user.data);
        const school = user.data.schools.find((school) => school.id === sid);
        const startDate = new Date(school.start_date.seconds * 1000);
        const endDate = new Date(school.end_date.seconds * 1000);

        setFormInputs({ ...school, start_date: startDate, end_date: endDate });
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startDate = utils.getTimeStamp(formInputs.start_date);
    const endDate = utils.getTimeStamp(formInputs.end_date);

    const cleanedSchools = user.schools.filter((school) => school.id !== sid);

    const updatedSchool = {
      ...formInputs,
      school_name: formInputs.school_name,
      start_date: startDate,
      end_date: endDate,
    };

    const data = {
      ...user,
      schools: [...cleanedSchools, updatedSchool],
    };

    try {
      const res = await apiCalls.editUserInfo(id, data);
      if (res.status === 200) {
        navigate(`/user-info/${id}`);
      } else {
        setError("There was an issue updating the data.");
      }
    } catch (error) {
      console.error(error);
      setError("There was an issue updating the data.");
    }
  };

  return (
    <div className="primary-content">
      <div className="title-link-container">
        <h1 className="page-title name-title">Edit School</h1>
        <Link
          to={`/user-info/${id}/edit-school/${sid}/delete`}
          className="comments-link"
        >
          Delete School
          <span className="icon-margin-left">
            <FontAwesomeIcon icon={faTrashAlt} size="sm" />
          </span>
        </Link>
      </div>
      <SchoolForm
        formInputs={formInputs}
        setFormInputs={setFormInputs}
        handleSubmit={handleSubmit}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default EditSchoolPage;

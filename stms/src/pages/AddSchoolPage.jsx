import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiCalls from "../api/apiUtils";
// import { useAuthContext } from "../context/AuthContext";
import utils from "../utils/utils";
import SchoolForm from "../components/SchoolForm";

const formTemplate = {
  school_name: "BLC",
  start_date: "",
  end_date: "",
};

const AddSchoolPage = () => {
  const [user, setUser] = useState();
  const [formInputs, setFormInputs] = useState(formTemplate);
  const [error, setError] = useState();

  //   const { currentUser, setCurrentUser } = useAuthContext();

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    apiCalls
      .getUser(id)
      .then((user) => {
        if (user.found) {
          setUser(user.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formInputs.school_name) {
      setError("Please enter a name.");
      return;
    }
    if (!formInputs.start_date) {
      setError("Please enter a start date.");
      return;
    }
    if (!formInputs.end_date) {
      setError("Please enter an end date.");
      return;
    }

    const newSchoolData = {
      school_name: formInputs.school_name,
      start_date: utils.getTimeStamp(formInputs.start_date),
      end_date: utils.getTimeStamp(formInputs.end_date),
    };

    console.log("NEW SCHOOL DATA: ", newSchoolData);

    const updatedUserData = {
      ...user,
      schools: [...user.schools, newSchoolData],
    };

    console.log("Updated User DATA: ", updatedUserData);

    apiCalls
      .editUserInfo(id, updatedUserData)
      .then((res) => {
        console.log("IN THE API CALL");
        if (!res.error) {
          navigate(`/user-info/${id}`);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="primary-content">
      <h1 className="page-title name-title">Add School</h1>
      <SchoolForm
        formInputs={formInputs}
        setFormInputs={setFormInputs}
        handleSubmit={handleSubmit}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default AddSchoolPage;

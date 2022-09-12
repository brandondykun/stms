import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiCalls from "../api/apiUtils";
import utils from "../utils/utils";
import SchoolForm from "../components/SchoolForm";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

const formTemplate = {
  school_name: "BLC",
  start_date: dayjs(),
  end_date: dayjs(),
  id: "",
};

const AddSchoolPage = () => {
  const [user, setUser] = useState();
  const [formInputs, setFormInputs] = useState(formTemplate);
  const [error, setError] = useState();
  const [submitLoading, setSubmitLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitLoading(true);

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

    if (dayjs(formInputs.end_date).isBefore(dayjs(formInputs.start_date))) {
      setError("Start date cannot be after end date.");
      return;
    }

    const newSchoolData = {
      school_name: formInputs.school_name,
      start_date: utils.getTimeStamp(formInputs.start_date),
      end_date: utils.getTimeStamp(formInputs.end_date),
      id: uuidv4(),
    };

    const updatedUserData = {
      ...user,
      schools: [...user.schools, newSchoolData],
    };

    try {
      const res = await apiCalls.editUserInfo(id, updatedUserData);
      if (!res.error) {
        navigate(`/user-info/${id}`);
      } else {
        setError("There was an issue adding the data.");
      }
    } catch (error) {
      console.error(error);
      setError("There was an issue adding the data.");
    }
    setSubmitLoading(false);
  };

  return (
    <div className="primary-content">
      <h1 className="page-title name-title">Add School</h1>
      <SchoolForm
        formInputs={formInputs}
        setFormInputs={setFormInputs}
        handleSubmit={handleSubmit}
        loading={submitLoading}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default AddSchoolPage;

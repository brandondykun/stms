import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import apiCalls from "../api/apiUtils";
import { useState } from "react";
import dayjs from "dayjs";

const DeleteSchoolPage = () => {
  const [school, setSchool] = useState();
  const [user, setUser] = useState();

  const [error, setError] = useState();

  const { id, sid } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    apiCalls.getUser(id).then((user) => {
      if (user.found) {
        setUser(user.data);
        const school = user.data.schools.find((school) => school.id === sid);
        setSchool(school);
      }
    });
  }, [id, sid]);

  const handleDelete = async () => {
    const cleanedSchools = user.schools.filter((school) => school.id !== sid);

    const updatedUserData = {
      ...user,
      schools: [...cleanedSchools],
    };

    try {
      const res = await apiCalls.editUserInfo(id, updatedUserData);
      if (res.status === 200) {
        navigate(`/user-info/${id}`);
      } else {
        setError("There was an issue deleting the data.");
      }
    } catch (error) {
      console.error(error);
      setError("There was an issue deleting the data.");
    }
  };

  return (
    <div className="primary-content">
      <h1 className="page-title name-title">Delete School</h1>
      {user && (
        <h2 className="centered-text font-size-15 color-gold">
          {`Are you sure you want to delete this School for ${user.rank} ${user.last_name} ?`}
        </h2>
      )}

      {school && (
        <div className="centered-text padding-t-20 font-size-12">
          <div className="padding-tb-05">{school?.school_name}</div>
          <div className="padding-tb-05">
            {`Start Date: 
            ${dayjs(school?.start_date.seconds * 1000).format("MM/DD/YYYY")}`}
          </div>
          <div className="padding-tb-05">
            {`End Date:
            ${dayjs(school?.end_date.seconds * 1000).format("MM/DD/YYYY")}`}
          </div>
        </div>
      )}
      <div className="form-button-container">
        <Link to={`/user-info/${id}/edit-school/${sid}`}>
          <button className="form-button login" type="button">
            Abort
          </button>
        </Link>
        <button className="form-button login" onClick={handleDelete}>
          Send It
        </button>
      </div>
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default DeleteSchoolPage;

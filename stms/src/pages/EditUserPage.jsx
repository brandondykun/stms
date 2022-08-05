import { useParams, Link } from "react-router-dom";
import UserForm from "../components/UserForm";
import utils from "../utils/utils";
import apiCalls from "../api/apiUtils";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const formTemplate = {
  first_name: "",
  middle_name: "",
  last_name: "",
  rank: "",
  grade: "",
  pebd: "",
  dor: "",
  ets: "",
  section: "UNASSIGNED",
  team: "UNASSIGNED",
  role: "UNASSIGNED",
  acft_score: 0,
  m4_qual: 0,
  dlc_1_complete: false,
  blc_complete: false,
  dlc_2_complete: false,
  alc_complete: false,
  dlc_3_complete: false,
  slc_complete: false,
  jfo_qualified: false,
  drivers_license: false,
  is_staff: false,
  unit_position: null,
  user_id: null,
};

const EditUserPage = () => {
  const [formInputs, setFormInputs] = useState(formTemplate);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    apiCalls
      .getUser(id)
      .then((user) => {
        // console.log("USER FROM EDIT USER PAGE: ", user);
        const pebdDate = new Date(user.pebd.seconds * 1000);
        const dorDate = new Date(user.dor.seconds * 1000);
        const etsDate = new Date(user.ets.seconds * 1000);

        setFormInputs({
          ...user,
          pebd: pebdDate,
          dor: dorDate,
          ets: etsDate,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pebdTimeStamp = utils.getTimeStamp(formInputs.pebd);
    const dorTimeStamp = utils.getTimeStamp(formInputs.dor);
    const etsTimeStamp = utils.getTimeStamp(formInputs.ets);
    const isStaff = utils.isStaff(formInputs.grade);

    const data = {
      ...formInputs,
      user_id: id,
      pebd: pebdTimeStamp,
      dor: dorTimeStamp,
      ets: etsTimeStamp,
      is_staff: isStaff,
    };

    try {
      const res = await apiCalls.editUserInfo(id, data);
      if (res.status === 200) {
        navigate(`/user-info/${id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="primary-content">
      <div className="title-link-container">
        <h1 className="page-title name-title">Edit Info</h1>
        <Link to={`/user-info/${id}`} className="comments-link">
          Back
        </Link>
      </div>
      <UserForm
        formInputs={formInputs}
        setFormInputs={setFormInputs}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditUserPage;
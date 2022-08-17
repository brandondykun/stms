import { useState } from "react";
import apiCalls from "../api/apiUtils";
import { useNavigate, useParams } from "react-router-dom";
import utils from "../utils/utils";
import UserForm from "../components/UserForm";
import { useAuthContext } from "../context/AuthContext";

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
  acft_pass: true,
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

const CreateAccountPage = () => {
  const [formInputs, setFormInputs] = useState(formTemplate);

  const { setAccountInfo } = useAuthContext();

  const { id } = useParams();

  const navigate = useNavigate();

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
      const res = await apiCalls.addUserInfo(data);
      if (res.status === 201) {
        const accountInfo = await apiCalls.getAccountByUserId(id);
        if (accountInfo.found) {
          setAccountInfo(accountInfo.data);
          navigate("/home");
        } // need an else to handle if accountInfo is not found
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="primary-content">
      <h1 className="page-title">Add Info</h1>
      <UserForm
        formInputs={formInputs}
        setFormInputs={setFormInputs}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateAccountPage;

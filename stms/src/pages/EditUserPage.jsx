import { useParams, Link, useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import utils from "../utils/utils";
import apiCalls from "../api/apiUtils";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
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
  acft_pass: "true",
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
  schools: [],
};

const EditUserPage = () => {
  const [formInputs, setFormInputs] = useState(formTemplate);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const { accountInfo } = useAuthContext();

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    apiCalls
      .getUser(id)
      .then((user) => {
        if (user.found) {
          setUser(user.data);
          const pebdDate = new Date(user.data.pebd.seconds * 1000);
          const dorDate = new Date(user.data.dor.seconds * 1000);
          const etsDate = new Date(user.data.ets.seconds * 1000);

          setFormInputs({
            ...user.data,
            pebd: pebdDate,
            dor: dorDate,
            ets: etsDate,
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    const pebdTimeStamp = utils.getTimeStamp(formInputs.pebd);
    const dorTimeStamp = utils.getTimeStamp(formInputs.dor);
    const etsTimeStamp = utils.getTimeStamp(formInputs.ets);
    const isStaff = utils.isStaff(formInputs.role);
    const acftPass = formInputs.acft_pass === "true" ? true : false;

    const data = {
      ...formInputs,
      pebd: pebdTimeStamp,
      dor: dorTimeStamp,
      ets: etsTimeStamp,
      is_staff: isStaff,
      acft_pass: acftPass,
    };

    try {
      const res = await apiCalls.editUserInfo(id, data);
      if (res.status === 200) {
        navigate(`/user-info/${id}`);
      }
    } catch (error) {
      console.error(error);
    }
    setSubmitLoading(false);
  };

  const pageTitle =
    accountInfo.id === id
      ? "Edit My Info"
      : `Edit ${user?.rank} ${user?.last_name}`;

  return (
    <div className="primary-content">
      {!loading && (
        <>
          <div className="title-link-container">
            <h1 className="page-title name-title">{pageTitle}</h1>
          </div>
          <Link to={`/user-info/${id}`} className="comments-link fit-link">
            <div className="edit-button-container">
              <span className="icon-margin-right">
                <FontAwesomeIcon icon={faAnglesLeft} />
              </span>
              Back
            </div>
          </Link>
          <UserForm
            formInputs={formInputs}
            setFormInputs={setFormInputs}
            handleSubmit={handleSubmit}
            loading={submitLoading}
          />
        </>
      )}
    </div>
  );
};

export default EditUserPage;

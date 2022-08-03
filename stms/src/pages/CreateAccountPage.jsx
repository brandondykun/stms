import { useState } from "react";
import apiCalls from "../api/apiUtils";
import { useNavigate, useParams } from "react-router-dom";
import utils from "../utils/utils";

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

const CreateAccountPage = () => {
  const [formInputs, setFormInputs] = useState(formTemplate);

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
      if (res.id) {
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="primary-content">
      <form className="form login-form" onSubmit={handleSubmit}>
        <input
          aria-label="first name"
          type="text"
          placeholder="first name"
          className="dark-input"
          value={formInputs.first_name}
          onChange={(e) =>
            setFormInputs({ ...formInputs, first_name: e.target.value })
          }
        />

        <input
          aria-label="middle name"
          type="text"
          placeholder="middle name"
          className="dark-input"
          value={formInputs.middle_name}
          onChange={(e) =>
            setFormInputs({ ...formInputs, middle_name: e.target.value })
          }
        />

        <input
          aria-label="last name"
          type="text"
          placeholder="last name"
          className="dark-input"
          value={formInputs.last_name}
          onChange={(e) =>
            setFormInputs({ ...formInputs, last_name: e.target.value })
          }
        />

        <select
          aria-label="rank"
          type="text"
          placeholder="rank"
          className="dark-input"
          value={formInputs.rank}
          onChange={(e) =>
            setFormInputs({ ...formInputs, rank: e.target.value })
          }
        >
          <option value="" disabled selected>
            rank
          </option>
          <option value="PVT">PVT</option>
          <option value="PV2">PV2</option>
          <option value="PFC">PFC</option>
          <option value="SPC">SPC</option>
          <option value="SGT">SGT</option>
          <option value="SSG">SSG</option>
          <option value="SFC">SFC</option>
          <option value="2LT">2LT</option>
          <option value="1LT">1LT</option>
          <option value="CPT">CPT</option>
        </select>

        <select
          aria-label="grade"
          type="text"
          placeholder="grade"
          className="dark-input"
          value={formInputs.grade}
          onChange={(e) =>
            setFormInputs({ ...formInputs, grade: e.target.value })
          }
        >
          <option value="" disabled selected>
            grade
          </option>
          <option value="E1">E1</option>
          <option value="E2">E2</option>
          <option value="E3">E3</option>
          <option value="E4">E4</option>
          <option value="E5">E5</option>
          <option value="E6">E6</option>
          <option value="E7">E7</option>
          <option value="O1">O1</option>
          <option value="O2">O2</option>
          <option value="O3">O3</option>
        </select>

        <label htmlFor="pebd">PEBD</label>
        <input
          id="pebd"
          aria-label="pay entry base date"
          type="date"
          className="dark-input"
          value={formInputs.pebd}
          onChange={(e) =>
            setFormInputs({ ...formInputs, pebd: e.target.value })
          }
        />

        <label htmlFor="dor">DOR</label>
        <input
          id="dor"
          aria-label="date of rank"
          type="date"
          className="dark-input"
          value={formInputs.dor}
          onChange={(e) =>
            setFormInputs({ ...formInputs, dor: e.target.value })
          }
        />

        <label htmlFor="ets">ETS</label>
        <input
          id="ets"
          aria-label="expiration term of service"
          type="date"
          className="dark-input"
          value={formInputs.ets}
          onChange={(e) =>
            setFormInputs({ ...formInputs, ets: e.target.value })
          }
        />

        <label htmlFor="m4_qual">ACFT Score:</label>
        <input
          type="number"
          id="acft_score"
          aria-label="acft score"
          className="dark-input"
          min="0"
          max="600"
          value={formInputs.acft_score}
          onChange={(e) =>
            setFormInputs({ ...formInputs, acft_score: e.target.value })
          }
        />

        <label htmlFor="m4_qual">M4 Qual:</label>
        <input
          type="number"
          id="m4_qual"
          className="dark-input"
          min="0"
          max="600"
          value={formInputs.m4_qual}
          onChange={(e) =>
            setFormInputs({ ...formInputs, m4_qual: e.target.value })
          }
        />

        <div className="create-account-form-input-container">
          <input
            type="checkbox"
            id="dlc_1_complete"
            value={formInputs.dlc_1_complete}
            onChange={(e) =>
              setFormInputs({ ...formInputs, dlc_1_complete: !dlc_1_complete })
            }
          />
          <label htmlFor="dlc_1_complete">DLC 1 Complete</label>
        </div>

        <div className="create-account-form-input-container">
          <input
            type="checkbox"
            id="blc_complete"
            value={formInputs.blc_complete}
            onChange={(e) =>
              setFormInputs({ ...formInputs, blc_complete: !blc_complete })
            }
          />
          <label htmlFor="blc_complete">BLC Complete</label>
        </div>

        <div className="create-account-form-input-container">
          <input
            type="checkbox"
            id="dlc_2_complete"
            value={formInputs.dlc_2_complete}
            onChange={(e) =>
              setFormInputs({ ...formInputs, dlc_2_complete: !dlc_2_complete })
            }
          />
          <label htmlFor="dlc_2_complete">DLC 2 Complete</label>
        </div>

        <div className="create-account-form-input-container">
          <input
            type="checkbox"
            id="alc_complete"
            value={formInputs.alc_complete}
            onChange={(e) =>
              setFormInputs({ ...formInputs, alc_complete: !alc_complete })
            }
          />
          <label htmlFor="alc_complete">ALC Complete</label>
        </div>

        <div className="create-account-form-input-container">
          <input
            type="checkbox"
            id="dlc_3_complete"
            value={formInputs.dlc_3_complete}
            onChange={(e) =>
              setFormInputs({ ...formInputs, dlc_3_complete: !dlc_3_complete })
            }
          />
          <label htmlFor="dlc_3_complete">DLC 3 Complete</label>
        </div>

        <div className="create-account-form-input-container">
          <input
            type="checkbox"
            id="slc_complete"
            value={formInputs.slc_complete}
            onChange={(e) =>
              setFormInputs({ ...formInputs, slc_complete: !slc_complete })
            }
          />
          <label htmlFor="slc_complete">SLC Complete</label>
        </div>

        <div className="create-account-form-input-container">
          <input
            type="checkbox"
            id="jfo_qualified"
            value={formInputs.jfo_qualified}
            onChange={(e) =>
              setFormInputs({ ...formInputs, jfo_qualified: !jfo_qualified })
            }
          />
          <label htmlFor="jfo_qualified">JFO Qualified</label>
        </div>

        <div className="create-account-form-input-container">
          <input
            type="checkbox"
            id="drivers_license"
            value={formInputs.drivers_license}
            onChange={(e) =>
              setFormInputs({
                ...formInputs,
                drivers_license: !drivers_license,
              })
            }
          />
          <label htmlFor="drivers_license">Military Drivers License</label>
        </div>
        <button className="form-button login" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateAccountPage;

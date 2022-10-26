import dayjs from "dayjs";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCalendar } from "@fortawesome/free-solid-svg-icons";
import BarLoader from "react-spinners/BarLoader";

const UserForm = ({ formInputs, setFormInputs, handleSubmit, loading }) => {
  const { id } = useParams();
  const { accountInfo } = useAuthContext();

  return (
    <form className="form user-form" onSubmit={handleSubmit}>
      <label htmlFor="first-name" className="form-label">
        First Name
      </label>
      <input
        id="first-name"
        aria-label="first name"
        type="text"
        placeholder="first name"
        className="dark-input with-label"
        required
        value={formInputs.first_name}
        onChange={(e) =>
          setFormInputs({ ...formInputs, first_name: e.target.value })
        }
      />

      <label htmlFor="middle-name" className="form-label">
        Middle Name
      </label>
      <input
        id="middle-name"
        aria-label="middle name"
        type="text"
        placeholder="middle name"
        className="dark-input with-label"
        required
        value={formInputs.middle_name}
        onChange={(e) =>
          setFormInputs({ ...formInputs, middle_name: e.target.value })
        }
      />
      <label htmlFor="last-name" className="form-label">
        Last Name
      </label>
      <input
        id="last-name"
        aria-label="last name"
        type="text"
        placeholder="last name"
        className="dark-input with-label"
        required
        value={formInputs.last_name}
        onChange={(e) =>
          setFormInputs({ ...formInputs, last_name: e.target.value })
        }
      />

      <div className="select-wrapper">
        <label htmlFor="rank" className="form-label">
          Rank
        </label>
        <select
          id="rank"
          aria-label="rank"
          type="text"
          placeholder="rank"
          className="dark-input with-label"
          required
          value={formInputs.rank}
          onChange={(e) =>
            setFormInputs({ ...formInputs, rank: e.target.value })
          }
        >
          <option value="" disabled>
            rank
          </option>
          <option value="PVT">PVT</option>
          <option value="PV2">PV2</option>
          <option value="PFC">PFC</option>
          <option value="SPC">SPC</option>
          <option value="SGT">SGT</option>
          <option value="SSG">SSG</option>
          <option value="SFC">SFC</option>
          <option value="CDT">CDT</option>
          <option value="2LT">2LT</option>
          <option value="1LT">1LT</option>
          <option value="CPT">CPT</option>
        </select>
        <div className="select-custom-icon">
          <FontAwesomeIcon icon={faAngleDown} size="lg" />
        </div>
      </div>

      <div className="select-wrapper">
        <label htmlFor="grade" className="form-label">
          Grade
        </label>
        <select
          id="grade"
          aria-label="grade"
          type="text"
          placeholder="grade"
          className="dark-input with-label"
          required
          value={formInputs.grade}
          onChange={(e) =>
            setFormInputs({ ...formInputs, grade: e.target.value })
          }
        >
          <option value="" disabled>
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
        <div className="select-custom-icon">
          <FontAwesomeIcon icon={faAngleDown} size="lg" />
        </div>
      </div>

      <div className="select-wrapper">
        <label htmlFor="pebd" className="form-label">
          Pay Entry Base Date (PEBD)
        </label>
        <input
          id="pebd"
          aria-label="pay entry base date"
          type="date"
          className="dark-input with-label"
          value={dayjs(formInputs.pebd).format("YYYY-MM-DD")}
          onChange={(e) =>
            setFormInputs({ ...formInputs, pebd: e.target.value })
          }
        />
        <div className="select-custom-icon">
          <FontAwesomeIcon icon={faCalendar} size="1x" />
        </div>
      </div>

      <div className="select-wrapper">
        <label htmlFor="dor" className="form-label">
          Date of Rank
        </label>
        <input
          id="dor"
          aria-label="date of rank"
          type="date"
          className="dark-input with-label"
          value={dayjs(formInputs.dor).format("YYYY-MM-DD")}
          onChange={(e) =>
            setFormInputs({ ...formInputs, dor: e.target.value })
          }
        />
        <div className="select-custom-icon">
          <FontAwesomeIcon icon={faCalendar} size="1x" />
        </div>
      </div>

      <div className="select-wrapper">
        <label htmlFor="ets" className="form-label">
          Expiration Term of Service (ETS) Date
        </label>
        <input
          id="ets"
          aria-label="expiration term of service"
          type="date"
          className="dark-input with-label"
          value={dayjs(formInputs.ets).format("YYYY-MM-DD")}
          onChange={(e) =>
            setFormInputs({ ...formInputs, ets: e.target.value })
          }
        />
        <div className="select-custom-icon">
          <FontAwesomeIcon icon={faCalendar} size="1x" />
        </div>
      </div>

      <label htmlFor="acft_score" className="form-label">
        ACFT Score:
      </label>
      <input
        type="number"
        id="acft_score"
        aria-label="acft score"
        className="dark-input with-label"
        min="0"
        max="600"
        pattern="[0-9]*"
        value={formInputs.acft_score}
        onChange={(e) =>
          setFormInputs((v) =>
            e.target.validity.valid
              ? { ...formInputs, acft_score: e.target.value }
              : v
          )
        }
      />

      <div className="select-wrapper">
        <label htmlFor="acft-select" className="form-label">
          ACFT Pass/Fail:
        </label>
        <select
          id="acft-select"
          aria-label="grade"
          type="text"
          placeholder="pass/fail"
          className="dark-input with-label"
          value={formInputs.acft_pass}
          onChange={(e) =>
            setFormInputs({ ...formInputs, acft_pass: e.target.value })
          }
        >
          <option value="true">Pass</option>
          <option value="false">Fail</option>
        </select>
        <div className="select-custom-icon">
          <FontAwesomeIcon icon={faAngleDown} size="lg" />
        </div>
      </div>

      <label htmlFor="m4_qual" className="form-label">
        M4 Qual:
      </label>
      <input
        type="number"
        id="m4_qual"
        className="dark-input with-label"
        min="0"
        max="600"
        pattern="[0-9]*"
        value={formInputs.m4_qual}
        onChange={(e) =>
          setFormInputs((v) =>
            e.target.validity.valid
              ? { ...formInputs, m4_qual: e.target.value }
              : v
          )
        }
      />
      <div className="form-checkboxes-container">
        <div className="switch-label-container">
          <div className="switch">
            <input
              id="switch-dlc-1"
              type="checkbox"
              className="switch-input"
              value={formInputs.dlc_1_complete}
              checked={formInputs.dlc_1_complete}
              onChange={(e) =>
                setFormInputs({
                  ...formInputs,
                  dlc_1_complete: !formInputs.dlc_1_complete,
                })
              }
            />
            <label htmlFor="switch-dlc-1" className="switch-label">
              DLC 1 Complete
            </label>
          </div>
          <label htmlFor="switch-dlc-1" className="inline-label">
            DLC 1 Complete
          </label>
        </div>

        <div className="switch-label-container">
          <div className="switch">
            <input
              id="switch-blc"
              type="checkbox"
              className="switch-input"
              value={formInputs.blc_complete}
              checked={formInputs.blc_complete}
              onChange={(e) =>
                setFormInputs({
                  ...formInputs,
                  blc_complete: !formInputs.blc_complete,
                })
              }
            />
            <label htmlFor="switch-blc" className="switch-label">
              BLC Complete
            </label>
          </div>
          <label htmlFor="switch-blc" className="inline-label">
            BLC Complete
          </label>
        </div>

        <div className="switch-label-container">
          <div className="switch">
            <input
              id="switch-dlc-2"
              type="checkbox"
              className="switch-input"
              value={formInputs.dlc_2_complete}
              checked={formInputs.dlc_2_complete}
              onChange={(e) =>
                setFormInputs({
                  ...formInputs,
                  dlc_2_complete: !formInputs.dlc_2_complete,
                })
              }
            />
            <label htmlFor="switch-dlc-2" className="switch-label">
              DLC 2 Complete
            </label>
          </div>
          <label htmlFor="switch-dlc-2" className="inline-label">
            DLC 2 Complete
          </label>
        </div>

        <div className="switch-label-container">
          <div className="switch">
            <input
              id="switch-alc"
              type="checkbox"
              className="switch-input"
              value={formInputs.alc_complete}
              checked={formInputs.alc_complete}
              onChange={(e) =>
                setFormInputs({
                  ...formInputs,
                  alc_complete: !formInputs.alc_complete,
                })
              }
            />
            <label htmlFor="switch-alc" className="switch-label">
              ALC Complete
            </label>
          </div>
          <label htmlFor="switch-alc" className="inline-label">
            ALC Complete
          </label>
        </div>

        <div className="switch-label-container">
          <div className="switch">
            <input
              id="switch-dlc-3"
              type="checkbox"
              className="switch-input"
              value={formInputs.dlc_3_complete}
              checked={formInputs.dlc_3_complete}
              onChange={(e) =>
                setFormInputs({
                  ...formInputs,
                  dlc_3_complete: !formInputs.dlc_3_complete,
                })
              }
            />
            <label htmlFor="switch-dlc-3" className="switch-label">
              DLC 3 Complete
            </label>
          </div>
          <label htmlFor="switch-dlc-3" className="inline-label">
            DLC 3 Complete
          </label>
        </div>

        <div className="switch-label-container">
          <div className="switch">
            <input
              id="switch-slc"
              type="checkbox"
              className="switch-input"
              value={formInputs.slc_complete}
              checked={formInputs.slc_complete}
              onChange={(e) =>
                setFormInputs({
                  ...formInputs,
                  slc_complete: !formInputs.slc_complete,
                })
              }
            />
            <label htmlFor="switch-slc" className="switch-label">
              SLC Complete
            </label>
          </div>
          <label htmlFor="switch-slc" className="inline-label">
            SLC Complete
          </label>
        </div>

        <div className="switch-label-container">
          <div className="switch">
            <input
              id="switch-jfo"
              type="checkbox"
              className="switch-input"
              value={formInputs.jfo_qualified}
              checked={formInputs.jfo_qualified}
              onChange={(e) =>
                setFormInputs({
                  ...formInputs,
                  jfo_qualified: !formInputs.jfo_qualified,
                })
              }
            />
            <label htmlFor="switch-jfo" className="switch-label">
              JFO Qualified
            </label>
          </div>
          <label htmlFor="switch-jfo" className="inline-label">
            JFO Qualified
          </label>
        </div>

        <div className="switch-label-container">
          <div className="switch">
            <input
              id="switch-license"
              type="checkbox"
              className="switch-input"
              value={formInputs.drivers_license}
              checked={formInputs.drivers_license}
              onChange={(e) =>
                setFormInputs({
                  ...formInputs,
                  drivers_license: !formInputs.drivers_license,
                })
              }
            />
            <label htmlFor="switch-license" className="switch-label">
              Military Drivers License
            </label>
          </div>
          <label htmlFor="switch-license" className="inline-label">
            Military Drivers License
          </label>
        </div>
      </div>

      <div className="form-button-container">
        {accountInfo && (
          <Link to={`/user-info/${id}`}>
            <button
              className={`form-button login ${
                loading ? "disabled-button" : ""
              }`}
              disabled={loading}
            >
              Cancel
            </button>
          </Link>
        )}
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

export default UserForm;

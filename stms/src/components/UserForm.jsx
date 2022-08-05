import dayjs from "dayjs";

const UserForm = ({ formInputs, setFormInputs, handleSubmit }) => {
  return (
    <form className="form login-form" onSubmit={handleSubmit}>
      {console.log("FORM INPUTS: ", formInputs)}
      <label htmlFor="first-name" className="form-label">
        First Name
      </label>
      <input
        id="first-name"
        aria-label="first name"
        type="text"
        placeholder="first name"
        className="dark-input with-label"
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
        value={formInputs.last_name}
        onChange={(e) =>
          setFormInputs({ ...formInputs, last_name: e.target.value })
        }
      />

      <label htmlFor="rank" className="form-label">
        Rank
      </label>
      <select
        id="rank"
        aria-label="rank"
        type="text"
        placeholder="rank"
        className="dark-input with-label"
        value={formInputs.rank}
        onChange={(e) => setFormInputs({ ...formInputs, rank: e.target.value })}
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

      <label htmlFor="grade" className="form-label">
        Grade
      </label>
      <select
        id="grade"
        aria-label="grade"
        type="text"
        placeholder="grade"
        className="dark-input with-label"
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

      <label htmlFor="pebd" className="form-label">
        PEBD
      </label>
      <input
        id="pebd"
        aria-label="pay entry base date"
        type="date"
        className="dark-input with-label"
        value={dayjs(formInputs.pebd).format("YYYY-MM-DD")}
        onChange={(e) => setFormInputs({ ...formInputs, pebd: e.target.value })}
      />

      <label htmlFor="dor" className="form-label">
        DOR
      </label>
      <input
        id="dor"
        aria-label="date of rank"
        type="date"
        className="dark-input with-label"
        value={dayjs(formInputs.dor).format("YYYY-MM-DD")}
        onChange={(e) => setFormInputs({ ...formInputs, dor: e.target.value })}
      />

      <label htmlFor="ets" className="form-label">
        ETS
      </label>
      <input
        id="ets"
        aria-label="expiration term of service"
        type="date"
        className="dark-input with-label"
        value={dayjs(formInputs.ets).format("YYYY-MM-DD")}
        onChange={(e) => setFormInputs({ ...formInputs, ets: e.target.value })}
      />

      <label htmlFor="m4_qual" className="form-label">
        ACFT Score:
      </label>
      <input
        type="number"
        id="acft_score"
        aria-label="acft score"
        className="dark-input with-label"
        min="0"
        max="600"
        value={formInputs.acft_score}
        onChange={(e) =>
          setFormInputs({ ...formInputs, acft_score: e.target.value })
        }
      />

      <label htmlFor="m4_qual" className="form-label">
        M4 Qual:
      </label>
      <input
        type="number"
        id="m4_qual"
        className="dark-input with-label"
        min="0"
        max="600"
        value={formInputs.m4_qual}
        onChange={(e) =>
          setFormInputs({ ...formInputs, m4_qual: e.target.value })
        }
      />
      <div className="form-checkboxes-container">
        <div className="checkbox-input-container">
          <input
            type="checkbox"
            id="dlc_1_complete"
            value={formInputs.dlc_1_complete}
            checked={formInputs.dlc_1_complete}
            onChange={(e) =>
              setFormInputs({
                ...formInputs,
                dlc_1_complete: !formInputs.dlc_1_complete,
              })
            }
          />
          <label htmlFor="dlc_1_complete">DLC 1 Complete</label>
        </div>

        <div className="checkbox-input-container">
          <input
            type="checkbox"
            id="blc_complete"
            value={formInputs.blc_complete}
            checked={formInputs.blc_complete}
            onChange={(e) =>
              setFormInputs({
                ...formInputs,
                blc_complete: !formInputs.blc_complete,
              })
            }
          />
          <label htmlFor="blc_complete">BLC Complete</label>
        </div>

        <div className="checkbox-input-container">
          <input
            type="checkbox"
            id="dlc_2_complete"
            value={formInputs.dlc_2_complete}
            checked={formInputs.dlc_2_complete}
            onChange={(e) =>
              setFormInputs({
                ...formInputs,
                dlc_2_complete: !formInputs.dlc_2_complete,
              })
            }
          />
          <label htmlFor="dlc_2_complete">DLC 2 Complete</label>
        </div>

        <div className="checkbox-input-container">
          <input
            type="checkbox"
            id="alc_complete"
            value={formInputs.alc_complete}
            checked={formInputs.alc_complete}
            onChange={(e) =>
              setFormInputs({
                ...formInputs,
                alc_complete: !formInputs.alc_complete,
              })
            }
          />
          <label htmlFor="alc_complete">ALC Complete</label>
        </div>

        <div className="checkbox-input-container">
          <input
            type="checkbox"
            id="dlc_3_complete"
            value={formInputs.dlc_3_complete}
            checked={formInputs.dlc_3_complete}
            onChange={(e) =>
              setFormInputs({
                ...formInputs,
                dlc_3_complete: !formInputs.dlc_3_complete,
              })
            }
          />
          <label htmlFor="dlc_3_complete">DLC 3 Complete</label>
        </div>

        <div className="checkbox-input-container">
          <input
            type="checkbox"
            id="slc_complete"
            value={formInputs.slc_complete}
            checked={formInputs.slc_complete}
            onChange={(e) =>
              setFormInputs({
                ...formInputs,
                slc_complete: !formInputs.slc_complete,
              })
            }
          />
          <label htmlFor="slc_complete">SLC Complete</label>
        </div>

        <div className="checkbox-input-container">
          <input
            type="checkbox"
            id="jfo_qualified"
            value={formInputs.jfo_qualified}
            checked={formInputs.jfo_qualified}
            onChange={(e) =>
              setFormInputs({
                ...formInputs,
                jfo_qualified: !formInputs.jfo_qualified,
              })
            }
          />
          <label htmlFor="jfo_qualified">JFO Qualified</label>
        </div>

        <div className="checkbox-input-container">
          <input
            type="checkbox"
            id="drivers_license"
            value={formInputs.drivers_license}
            checked={formInputs.drivers_license}
            onChange={(e) =>
              setFormInputs({
                ...formInputs,
                drivers_license: !formInputs.drivers_license,
              })
            }
          />
          <label htmlFor="drivers_license">Military Drivers License</label>
        </div>
      </div>
      <div className="form-button-container">
        <button className="form-button login" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default UserForm;

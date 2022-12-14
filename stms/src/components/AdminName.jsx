import { useState, useEffect } from "react";
import apiCalls from "../api/apiUtils";
import { useUsersContext } from "../context/UsersContext";
import utils from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const AdminName = ({ user }) => {
  const [expand, setExpand] = useState(false);
  const [userInfo, setUserInfo] = useState({ ...user });

  const { users, setUsers, active, setActive } = useUsersContext();

  useEffect(() => {
    return () => {
      setActive("");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setExpand(false);
    const newUserInfo = {
      ...userInfo,
      unit_position: utils.assignUnitPosition(userInfo),
    };
    apiCalls
      .editUserInfo(user.id, newUserInfo)
      .then((res) => {
        if (res.status === 200) {
          const updated = users.filter((u) => {
            return u.id !== user.id;
          });
          setTimeout(() => {
            setUsers([...updated, { ...newUserInfo }]);
            setActive("");
          }, 700);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleToggle = (id) => {
    setExpand(!expand);
    if (active !== "") {
      setActive("");
    } else {
      setActive(id);
    }
  };

  const handleSectionChange = (e) => {
    const newSectionValue = e.target.value;
    const autoUpdate = {};

    if (newSectionValue === "BN STAFF") {
      autoUpdate.team = "HQ";
      autoUpdate.role = "BN FO";
    } else if (newSectionValue !== "UNASSIGNED") {
      autoUpdate.team = "HQ";
      autoUpdate.role = "CO FSO";
    } else {
      autoUpdate.team = "UNASSIGNED";
      autoUpdate.role = "UNASSIGNED";
    }

    setUserInfo((info) => ({
      ...info,
      section: newSectionValue,
      ...autoUpdate,
    }));
  };

  const handleTeamChange = (e) => {
    const newTeamValue = e.target.value;
    const autoUpdate = {};

    if (newTeamValue == "HQ") {
      autoUpdate.role = "CO FSO";
    } else if (newTeamValue === "UNASSIGNED") {
      autoUpdate.role = "UNASSIGNED";
    } else {
      autoUpdate.role = "FO";
    }

    setUserInfo((info) => ({
      ...info,
      team: newTeamValue,
      ...autoUpdate,
    }));
  };

  // derived state to determine which options should display
  const section = userInfo.section;
  const team = userInfo.team;

  const showTeamOptions =
    section !== "UNASSIGNED" && section !== "BN STAFF" ? true : false;
  const showTeamHqOption = section !== "UNASSIGNED";
  const showUnassigned = section === "UNASSIGNED" ? true : false;
  const showBnRole = section === "BN STAFF" ? true : false;
  const showCoRole =
    section !== "BN STAFF" && section !== "UNASSIGNED" ? true : false;
  const showCoHqRole = showCoRole && team === "HQ" ? true : false;
  const showCoTeamRole = showCoRole && team !== "HQ" ? true : false;

  return (
    <div className="expandable-container">
      <div className="top-section">
        <div>
          {user.role} {user.rank} {user.last_name}
        </div>
        <div>
          <button
            onClick={() => handleToggle(user.id)}
            className="assign-form-button"
            disabled={active !== user.id && active !== ""}
          >
            {expand ? "Cancel" : "Assign"}
          </button>
        </div>
      </div>
      <div className="expand-container">
        <div className={`expand-contract ${expand ? " expanded" : ""}`}>
          <form className="assign-form" onSubmit={handleSubmit}>
            <div className="assign-form-inputs-container">
              <div className="select-wrapper">
                <select
                  id="section"
                  aria-label="section"
                  placeholder="section"
                  className="dark-input with-label assign-input"
                  value={userInfo.section}
                  onChange={(e) =>
                    // setUserInfo((info) => ({ ...info, section: e.target.value }))
                    handleSectionChange(e)
                  }
                >
                  <option value="" disabled>
                    SECTION
                  </option>
                  <option value="BN STAFF">BN STAFF</option>
                  <option value="ALPHA">ALPHA</option>
                  <option value="BRAVO">BRAVO</option>
                  <option value="CHARLIE">CHARLIE</option>
                  <option value="UNASSIGNED">UNASSIGNED</option>
                </select>
                <div className="select-custom-icon-reassign">
                  <FontAwesomeIcon icon={faAngleDown} size="sm" />
                </div>
              </div>

              <div className="select-wrapper">
                <select
                  id="team"
                  aria-label="team"
                  placeholder="team"
                  className="dark-input with-label assign-input"
                  value={userInfo.team}
                  onChange={(e) => handleTeamChange(e)}
                >
                  <option value="" disabled>
                    TEAM
                  </option>
                  {showTeamHqOption && <option value="HQ">HQ</option>}
                  {showTeamOptions && <option value="1">1</option>}
                  {showTeamOptions && <option value="2">2</option>}
                  {showTeamOptions && <option value="3">3</option>}
                  {showUnassigned && (
                    <option value="UNASSIGNED">UNASSIGNED</option>
                  )}
                </select>
                <div className="select-custom-icon-reassign">
                  <FontAwesomeIcon icon={faAngleDown} size="sm" />
                </div>
              </div>

              <div className="select-wrapper">
                <select
                  id="role"
                  aria-label="role"
                  placeholder="role"
                  className="dark-input with-label assign-input"
                  value={userInfo.role}
                  onChange={(e) =>
                    setUserInfo((info) => ({ ...info, role: e.target.value }))
                  }
                >
                  <option value="" disabled>
                    ROLE
                  </option>
                  {showBnRole && <option value="BN FSO">BN FSO</option>}
                  {showBnRole && <option value="BN FSNCO">BN FSNCO</option>}
                  {showBnRole && <option value="AFATDS">AFATDS</option>}
                  {showBnRole && <option value="BN FO">BN FO</option>}
                  {showBnRole && <option value="BN RTO">BN RTO</option>}
                  {showCoHqRole && <option value="CO FSO">CO FSO</option>}
                  {showCoHqRole && <option value="CO FSNCO">CO FSNCO</option>}
                  {showCoTeamRole && <option value="FO">FO</option>}
                  {showCoTeamRole && <option value="RTO">RTO</option>}
                  {showUnassigned && (
                    <option value="UNASSIGNED">UNASSIGNED</option>
                  )}
                </select>
                <div className="select-custom-icon-reassign">
                  <FontAwesomeIcon icon={faAngleDown} size="sm" />
                </div>
              </div>
            </div>
            <div className="assign-form-button-container">
              <button className="assign-form-button">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminName;

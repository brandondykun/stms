import { useState } from "react";
import apiCalls from "../api/apiUtils";
import { useUsersContext } from "../context/UsersContext";
import utils from "../utils/utils";

const AdminName = ({ user }) => {
  const [expand, setExpand] = useState(false);
  const [userInfo, setUserInfo] = useState({ ...user });

  const { users, setUsers, active, setActive } = useUsersContext();

  const handleSubmit = (e) => {
    e.preventDefault();
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
          setUsers([...updated, { ...newUserInfo }]);
          setExpand(false);
          setActive("");
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
              <select
                id="section"
                aria-label="section"
                placeholder="section"
                className="dark-input with-label assign-input"
                value={userInfo.section}
                onChange={(e) =>
                  setUserInfo((info) => ({ ...info, section: e.target.value }))
                }
              >
                <option value="" disabled>
                  SECTION
                </option>
                <option value="BN STAFF">BN STAFF</option>
                <option value="ALPHA">ALPHA</option>
                <option value="BRAVO">BRAVO</option>
                <option value="CHARLIE">CHARLIE</option>
                <option value="DELTA">DELTA</option>
                <option value="UNASSIGNED">UNASSIGNED</option>
              </select>

              <select
                id="team"
                aria-label="team"
                placeholder="team"
                className="dark-input with-label assign-input"
                value={userInfo.team}
                onChange={(e) =>
                  setUserInfo((info) => ({ ...info, team: e.target.value }))
                }
              >
                <option value="" disabled>
                  TEAM
                </option>
                <option value="HQ">HQ</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="UNASSIGNED">UNASSIGNED</option>
              </select>

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
                <option value="BN FSO">BN FSO</option>
                <option value="BN FSNCO">BN FSNCO</option>
                <option value="AFATDS">AFATDS</option>
                <option value="BN FO">BN FO</option>
                <option value="BN RTO">BN RTO</option>
                <option value="CO FSO">CO FSO</option>
                <option value="CO FSNCO">CO FSNCO</option>
                <option value="FO">FO</option>
                <option value="RTO">RTO</option>
                <option value="UNASSIGNED">UNASSIGNED</option>
              </select>
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

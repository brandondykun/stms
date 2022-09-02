import { useEffect } from "react";
import { useState } from "react";
import { useUsersContext } from "../context/UsersContext";
import apiCalls from "../api/apiUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faXmark,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StaffPrivileges = () => {
  const [inputUserId, setInputUserId] = useState("");
  const [allUsers, setAllUsers] = useState(null);
  const [expand, setExpand] = useState(false);

  const { users, setUsers } = useUsersContext();
  const { accountInfo } = useAuthContext();

  useEffect(() => {
    setAllUsers(users);
  }, [users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    apiCalls
      .editUserInfo(inputUserId, { is_staff: true })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Admin privileges granted.", {
            autoClose: 3000,
          });
          const currentUser = users.find((user) => user.id === inputUserId);
          const updatedCurrentUser = { ...currentUser, is_staff: true };
          const updatedUsers = users
            .filter((user) => {
              return user.id !== inputUserId;
            })
            .concat(updatedCurrentUser);
          setUsers(updatedUsers);
          setExpand(false);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleRemoveSubmit = (id) => {
    if (id === accountInfo.id) {
      toast.error("Failed to remove privileges.", { autoClose: 3000 });
      return null;
    }
    apiCalls
      .editUserInfo(id, { is_staff: false })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Admin privileges removed.", {
            autoClose: 3000,
          });
          const currentUser = users.find((user) => user.id === id);
          const updatedCurrentUser = { ...currentUser, is_staff: false };
          const updatedUsers = users
            .filter((user) => {
              return user.id !== id;
            })
            .concat(updatedCurrentUser);
          setUsers(updatedUsers);
        }
      })
      .catch((err) => console.error(err));
  };

  const nonStaffUsers = allUsers?.filter((user) => {
    return !user.is_staff;
  });

  const staffUsers = allUsers?.filter((user) => {
    return user.is_staff;
  });

  return (
    <div className="admin-section expandable-container">
      <ToastContainer theme={"dark"} />
      <div className="expand-container">
        <div className="staff-permission-list-title">
          <h2>ADMIN USERS</h2>
          <button
            onClick={() => setExpand(!expand)}
            className="expand-form-button right-button"
          >
            {!expand ? (
              <FontAwesomeIcon icon={faUserPlus} size="lg" />
            ) : (
              <FontAwesomeIcon icon={faXmark} size="xl" />
            )}
          </button>
        </div>
        <div className="expand-container">
          <div className={`expand-contract ${expand ? " expanded" : ""}`}>
            <div className="padding-b-10 font-size-11 color-gold">
              Add Admin Permissions
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex-space-between privilege-form"
            >
              <div className="select-wrapper">
                <select
                  name="user-select"
                  id="user-select"
                  className="staff-select"
                  value={inputUserId}
                  onChange={(e) => {
                    setInputUserId(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {nonStaffUsers &&
                    nonStaffUsers.map((user) => {
                      return (
                        <option value={user.id} key={user.id}>
                          {user.rank} {user.last_name}
                        </option>
                      );
                    })}
                </select>
                <div className="select-custom-icon-privileges">
                  <FontAwesomeIcon icon={faAngleDown} size="sm" />
                </div>
              </div>
              <div className="text-align-right padding-l-05">
                <button
                  type="button"
                  className="assign-form-button permissions"
                  onClick={() => setExpand(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="assign-form-button permissions"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="padding-t-10">
        {staffUsers &&
          staffUsers.map((user) => {
            return (
              <div
                key={user.id}
                className="staff-user-name flex-space-between padding-b-10"
              >
                <div className={`${expand ? "greyed-out-text" : ""}`}>
                  {user.rank} {user.last_name}
                </div>
                {user.id !== accountInfo.id && (
                  <button
                    onClick={() => handleRemoveSubmit(user.id)}
                    className="assign-form-button"
                    disabled={expand}
                  >
                    Remove
                  </button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default StaffPrivileges;

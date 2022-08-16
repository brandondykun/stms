import React, { useEffect, useState, createContext, useContext } from "react";
import apiCalls from "../api/apiUtils";

export const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const res = await apiCalls.getAllUsers();
      if (res.status === 200) {
        setUsers(res.data);
      } else {
        console.error("Error", res.error);
        // handle this error
      }
    };
    getUsers();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        active,
        setActive,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => {
  const { users, setUsers, active, setActive } = useContext(UsersContext);
  return { users, setUsers, active, setActive };
};

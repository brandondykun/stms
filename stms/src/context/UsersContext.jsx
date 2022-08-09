import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";

export const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [active, setActive] = useState("");

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

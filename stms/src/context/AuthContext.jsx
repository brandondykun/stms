// import { useState } from "react";
// import { useContext } from "react";
// import { createContext } from "react";

// const userContext = createContext(null);
// export const UserContextProvider = ({ children }) => {
//   const [contextUser, setContextUser] = useState("");

//   return (
//     <userContext.Provider
//       value={{
//         contextUser,
//         setContextUser,
//       }}
//     >
//       {children}
//     </userContext.Provider>
//   );
// };

// export const useUserContext = () => {
//   const { contextUser, setContextUser } = useContext(userContext);
//   return { contextUser, setContextUser };
// };

// new

import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { auth } from "../firebase-config";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  return { currentUser, setCurrentUser };
};

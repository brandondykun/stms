import { useEffect, useState, createContext, useContext } from "react";
import { auth } from "../firebase-config";
import apiCalls from "../api/apiUtils";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [accountInfo, setAccountInfo] = useState("");
  const [pending, setPending] = useState(true);

  const handleAuthChange = async (u) => {
    setCurrentUser(u);
    if (u) {
      const userInfo = await apiCalls.getAccountByUserId(u.uid);
      if (userInfo.found) {
        setAccountInfo(userInfo.data);
      }
    }
    setPending(false);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      handleAuthChange(user);
    });
  }, []);

  if (pending) {
    return <div className="loading-page">Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        accountInfo,
        setAccountInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const { currentUser, setCurrentUser, accountInfo, setAccountInfo } =
    useContext(AuthContext);
  return { currentUser, setCurrentUser, accountInfo, setAccountInfo };
};

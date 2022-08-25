import { useEffect, useState, createContext, useContext } from "react";
import { auth } from "../firebase-config";
import apiCalls from "../api/apiUtils";
import Loading from "../components/Loading";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [accountInfo, setAccountInfo] = useState("");
  const [pending, setPending] = useState(true);

  const handleAuthChange = async (u) => {
    if (u?.uid) {
      setCurrentUser({ email: u.email, uid: u.uid });
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
    return <Loading pending={pending} />;
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

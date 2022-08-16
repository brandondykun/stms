import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { useUsersContext } from "../context/UsersContext";
import apiCalls from "../api/apiUtils";

/* 
Route only allows access to children if the logged in user
is a staff user (accountInfo.is_staff).
*/

const AdminRoute = ({ redirectPath = "/home", children }) => {
  const { accountInfo } = useAuthContext();
  const { setUsers } = useUsersContext();

  if (!accountInfo.is_staff) {
    return <Navigate to={redirectPath} replace />;
  }

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

  return children ? children : <Outlet />;
};

export default AdminRoute;

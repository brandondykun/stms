import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

/* 
Route only allows access to children if the logged in user
is a staff user (accountInfo.is_staff).
*/

const AdminRoute = ({ redirectPath = "/home", children }) => {
  const { accountInfo } = useAuthContext();

  if (!accountInfo.is_staff) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default AdminRoute;

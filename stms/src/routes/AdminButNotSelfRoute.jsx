import { Navigate, Outlet, useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

/* 
Route only allows access to children if the logged in user is a
staff user (accountInfo.is_staff) AND if the logged in user is not trying 
to access their own information.
*/

const AdminButNotSelfRoute = ({ redirectPath = "/home", children }) => {
  const { accountInfo } = useAuthContext();

  const { id } = useParams();

  if (!accountInfo.is_staff || accountInfo.id === id) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default AdminButNotSelfRoute;

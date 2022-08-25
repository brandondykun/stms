import { Navigate, Outlet, useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

/* 
Route only allows access to children if the logged in user is a
staff user (accountInfo.is_staff) or if the logged in user is trying 
to access their own information.
*/

const SelfRoute = ({ redirectPath = "/home", children }) => {
  const { accountInfo } = useAuthContext();

  const { id } = useParams();

  if (accountInfo.id !== id) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default SelfRoute;

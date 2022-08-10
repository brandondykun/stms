import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

/* 
Route only allows access to children if the user is logged in.
If the user is not logged in, currentUser will be null.
*/

const RequireAuthRoute = ({ redirectPath = "/login", children }) => {
  const { currentUser } = useAuthContext();

  if (!currentUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default RequireAuthRoute;

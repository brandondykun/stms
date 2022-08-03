import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/AuthContext";

const ProtectedRoute = ({ redirectPath = "/login", children, isLoading }) => {
  const { contextUser } = useUserContext();

  if (isLoading) {
    return (
      <div className="primary-content">
        <h2>LOADING...</h2>
      </div>
    );
  }
  if (!contextUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;

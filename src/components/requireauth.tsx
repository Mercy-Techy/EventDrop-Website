import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/authcontext";

const RequireAuth = () => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default RequireAuth;

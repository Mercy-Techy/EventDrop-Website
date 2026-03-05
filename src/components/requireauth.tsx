// import { Navigate } from "react-router";
import { useAuth } from "../context/authcontext";
import type { ReactNode } from "react";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { isAuth } = useAuth();
  console.log(isAuth);
  // if (!isAuth) {
  //   return <Navigate to="/login" replace />;
  // }
  return children;
};

export default RequireAuth;

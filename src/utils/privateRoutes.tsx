// src/routes/PrivateRoutes.tsx
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  isAuthenticated: boolean;
  role: "user" | "admin";
  allowedRoles: ("user" | "admin")[];
  redirectTo?: string;
}

const PrivateRoutes = ({ isAuthenticated, role, allowedRoles, redirectTo = "/login" }: Props) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to={role === "admin" ? "/dashboard" : "/"} replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;

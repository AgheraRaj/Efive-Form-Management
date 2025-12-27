import { Navigate, Outlet } from "react-router";
import { jwtDecode } from "jwt-decode";


import { useAuth } from "../hooks/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const { role } = jwtDecode(token);

    if (allowedRoles && !allowedRoles.includes(role)) {
      return <Navigate to="/" replace />;
    }

    return <Outlet />;
  } catch {
    return <Navigate to="/" replace />;
  }

};

export default ProtectedRoute;

/**
 * ProtectedRoute.tsx
 *
 * A route that only admins are able to access.
 */

import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) return null;
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;

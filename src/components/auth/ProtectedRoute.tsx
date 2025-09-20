import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { AppPath } from "../../lib/app.config";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useUser();

  // If user is not authenticated, redirect to auth page
  if (!user) {
    return <Navigate to={AppPath.AUTH} replace />;
  }

  // If user is authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;

import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    // Redirect to auth page if not logged in
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export default ProtectedRoute;

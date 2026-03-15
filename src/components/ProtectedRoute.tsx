import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const user = localStorage.getItem("currentUser");

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
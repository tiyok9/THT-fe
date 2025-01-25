import { Navigate } from "react-router";

const ProtectedRoute = ({ children, isAuth }: any) => {
  return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

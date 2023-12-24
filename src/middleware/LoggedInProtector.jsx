import { Navigate } from "react-router-dom";

export const LoggedInProtector = ({ children, user }) => {
  return user ? <Navigate to={"/admin/dashboard"} /> : children;
};

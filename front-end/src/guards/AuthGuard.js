import { Navigate } from "react-router-dom";

export const AuthGuard = ({ children }) => {
  console.log(localStorage.getItem('token'));
  if (localStorage.getItem('token')) {
    return children;
  }
  return <Navigate to="/login" />;
};
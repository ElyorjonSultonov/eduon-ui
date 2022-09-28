import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { StateContext } from "../../context/Context";

const ProtectedRoutes = () => {
  // const loggedIn = localStorage.getItem("access")
  const { loggedIn } = useContext(StateContext);
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoutes;

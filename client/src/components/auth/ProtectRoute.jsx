import React from "react";
import { Navigate, Outlet } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const ProtectRoute = ({ children, user, redirect = "/login" }) => {
  if (!user) {
    return <Navigate to={redirect} />;
  }

  return children || <Outlet />;
};

export default ProtectRoute;

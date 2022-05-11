import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context";

export const RequireAuth = () => {
  const { isLoggedIn } = useAuth();

  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={"/authenticate"} state={{ from: location }} replace={true} />
  );
};

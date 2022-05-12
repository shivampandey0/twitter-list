import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context";

export const RedirectAuth = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return isLoggedIn ? (
    <Navigate to={"/lists"} state={{ from: location }} replace={true} />
  ) : (
    <Outlet />
  );
};

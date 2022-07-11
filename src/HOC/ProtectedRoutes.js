import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  let auth = localStorage.getItem("jobPortalUser");
  let authData = "";
  if (auth) {
    authData = JSON.parse(auth);
  }

  return authData ? (
    authData.roles && authData.roles === "EMPLOYER" ? (
      <Navigate to="/posted-jobs" />
    ) : (
      <Navigate to="/find-work" />
    )
  ) : (
    children
  );
}

export default ProtectedRoutes;

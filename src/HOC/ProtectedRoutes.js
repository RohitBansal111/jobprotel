import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  let auth = localStorage.getItem("jobPortalUser");
  let authData = "";
  if (auth) {
    authData = JSON.parse(auth);
  }
  return authData ? (
    authData?.roles && authData.roles === "Employer" ? (
      <Navigate to="/posted-jobs" />
    ) : (
      <Navigate to="/find-work" />
    )
  ) : (
    children
  );
}

export default ProtectedRoutes;

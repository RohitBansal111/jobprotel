import React from "react";
import { Navigate } from "react-router-dom";
import toast from "toastr";

function PrivateRoutes({ children }) {
  const auth = JSON.parse(localStorage.getItem("jobPortalUser"));
  let location = window.location.href?.split("?")[1]?.split("&");

  let user_data = window.location.href
    ?.split("?")[1]
    ?.substring(6)
    ?.split("&email=");
  let token = user_data && user_data[0]?.split("+")?.join("%2B");

  let tokenCheck = location && location[0]?.slice(0, 6);
  let emailCheck = location && location[1]?.slice(0, 6);

  return auth && auth?.roles == "Student" ? (
    <Navigate to="/student/edit-profile" />
  ) : auth && auth?.roles == "Employer" ? (
    <Navigate to="/employer/edit-profile" />
  ) : tokenCheck == "token=" && emailCheck == "email=" && token?.length > 15 ? (
    children
  ) : (
    <Navigate to="/" />
  );
}
export default PrivateRoutes;

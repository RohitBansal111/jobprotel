import React from "react";
import { Navigate, useParams } from "react-router-dom";

function InvitationRoutes({ children }) {
  const { status, jobId, userId } = useParams();
  const auth = localStorage.getItem("jobPortalUser");

  if (auth) {
    return children;
  } else {
    let jobInvitation = {
      userId,
      jobId,
      status,
    };
    localStorage.setItem("jobInvitation", JSON.stringify(jobInvitation));
    return <Navigate to="/" />;
  }
}
export default InvitationRoutes;

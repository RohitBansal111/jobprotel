import React, { useState, useEffect } from "react";
import * as types from "./types/auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployerApplication from "./pages/Employer/applications";
import EmployerInbox from "./pages/Employer/Inbox";
import FindWork from "./pages/find-work";
import ForgotPassword from "./pages/Forgot-Password";
import Inbox from "./pages/inbox";
import Invites from "./pages/Invites";
import Login from "./pages/Login";
import StudentApplication from "./pages/applications";
import Notification from "./pages/notification";
import PostedJob from "./pages/Employer/posted-job";
import Profile from "./pages/profile";
import EditProfile from "./pages/profile/EditProfile";
import Register from "./pages/Register";
import "./scss/Main.scss";
import "react-phone-number-input/style.css";
import EmployerRoles from "./pages/Employer/roles";
import ReviewApplications from "./pages/Employer/posted-job/review-applications";
import Applications from "./pages/Employer/posted-job/applications";
import EmployerProfile from "./pages/Employer/profile";
import EmployerEditProfile from "./pages/Employer/profile/EditProfile";
import DetailsPage from "./pages/find-work/detail-page";
import PrivacyPolicy from "./policy/privacyPolicy";
import TermsConditions from "./T&C/TermsConditions";
import ProtectedRoutes from "./HOC/ProtectedRoutes";
import PrivateRoutes from "./HOC/PrivateRoutes";
import ProtectedRouteToVerify from "./HOC/ProtectedRouteToVerify";
import EmployerJobDetailsPage from "./pages/Employer/posted-job/detail-page";
import PublicProfile from "./pages/Employer/public";
import EmployerJobSuggestion from "./pages/Employer/suggestions";
import ResetPassword from "./pages/resetPassword";
import PaymentSuccess from "./pages/payments/PaymentSuccess";
import PaymentFailure from "./pages/payments/PaymentFailure";
import InvitationRoutes from "./HOC/InvitationRoutes";
import InvitationAccepted from "./pages/Employer/posted-job/invitation-accepted";
import Verify from "./email-verification/Verify";
import * as studentServices from "./services/studentServices";
import * as employerServices from "./services/employerServices";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(async () => {
    let data = JSON.parse(localStorage.getItem("jobPortalUser"));
    let id = data.id;
    if (data.roles == "Student") {
      const resp = await studentServices.getStudentDetails(id);
      if (resp.status == 200) {
        const response = resp.data.data;
        dispatch({
          type: types.UPDATE_DATA,
          payload: response,
        });
      }
    } else if (data.roles == "Employer") {
      const resp = await employerServices.getEmployerDetails(id);
      if (resp.status == 200) {
        dispatch({
          type: types.UPDATE_DATA,
          payload: resp.data.data,
        });
      }
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoutes>
              <Login />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoutes>
              <Register />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/email-verification/*"
          element={
            <ProtectedRouteToVerify>
              <Verify />
            </ProtectedRouteToVerify>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/find-work"
          element={
            <PrivateRoutes>
              <FindWork />
            </PrivateRoutes>
          }
        />
        <Route
          path="/posted-jobs"
          element={
            <PrivateRoutes>
              <PostedJob />
            </PrivateRoutes>
          }
        />

        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/public/:userId" element={<PublicProfile />} />
        <Route path="/job-details/:id" element={<EmployerJobDetailsPage />} />
        <Route path="/suggestion/:jobid" element={<EmployerJobSuggestion />} />
        <Route path="/job-details" element={<EmployerJobDetailsPage />} />
        <Route path="/jobs-applied" element={<StudentApplication />} />
        <Route path="/inbox/:userId/:jobId" element={<Inbox />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/notifications" element={<Notification />} />

        <Route
          path="/invites/:status/:jobId/:userId"
          element={
            <InvitationRoutes>
              <Invites />
            </InvitationRoutes>
          }
          exact
        />

        <Route
          path="/invites"
          element={
            <PrivateRoutes>
              <Invites />
            </PrivateRoutes>
          }
          exact
        />
        <Route path="/student/profile" element={<Profile />} />
        <Route path="/employer/profile" element={<EmployerProfile />} />
        <Route
          path="/employer/edit-profile"
          element={<EmployerEditProfile />}
        />
        <Route path="/student/edit-profile" element={<EditProfile />} />
        <Route
          path="/employer/applications"
          element={<EmployerApplication />}
        />
        <Route
          path="/review-applications/:jobid"
          element={<ReviewApplications />}
        />
        <Route
          path="/invitation-accepted/:invitationid"
          element={<InvitationAccepted />}
        />
        <Route path="/applications" element={<Applications />} />
        <Route path="/roles" element={<EmployerRoles />} />
        <Route path="/employer-inbox" element={<EmployerInbox />} />
        <Route path="/find-work/details/:id" element={<DetailsPage />} />
        <Route path="/payment-suceess" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;

import React from "react";
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
import EmployerProfile from "./pages/Employer/profile";
import EmployerEditProfile from "./pages/Employer/profile/EditProfile";
import DetailsPage from "./pages/find-work/detail-page";
import PrivacyPolicy from "./policy/privacyPolicy";
import TermsConditions from "./T&C/TermsConditions";
import ProtectedRoutes from "./HOC/ProtectedRoutes";
import PrivateRoutes from "./HOC/PrivateRoutes";
function App() {
  var role = "employer";
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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {role === "student" && (
          <Route
            path="/find-work"
            element={
              <PrivateRoutes>
                <FindWork />
              </PrivateRoutes>
            }
          />
        )}
        {role === "employer" && (
          <Route
            path="/posted-jobs"
            element={
              <PrivateRoutes>
                <PostedJob />
              </PrivateRoutes>
            }
          />
        )}
        <Route path="/find-work" element={<FindWork />} />

        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />

        <Route path="/posted-jobs" element={<PostedJob />} />
        <Route path="/jobs-applied" element={<StudentApplication />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/invites" element={<Invites />} />
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
        <Route path="/review-applications" element={<ReviewApplications />} />
        <Route path="/roles" element={<EmployerRoles />} />
        <Route path="/employer-inbox" element={<EmployerInbox />} />
        <Route path="/find-work/details" element={<DetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

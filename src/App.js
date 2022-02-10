import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Applications from './pages/Employer/applications';
import EmployerInbox from './pages/Employer/Inbox';
import FindWork from './pages/find-work';
import ForgotPassword from './pages/Forgot-Password';
import Inbox from './pages/inbox';
import Invites from './pages/Invites';
import Login from './pages/Login';
import MyApplications from './pages/my-applications';
import Notification from './pages/notification';
import PostedJob from './pages/Employer/posted-job';
import Profile from './pages/profile';
import EditProfile from './pages/profile/EditProfile';
import Register from './pages/Register';
import './scss/Main.scss' 
import EmployerRoles from './pages/Employer/roles';
import ReviewApplications from './pages/Employer/posted-job/review-applications';



function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/find-work" element={<FindWork/>} />
          <Route path="/my-applications" element={<MyApplications/>} />
          <Route path="/inbox" element={<Inbox/>} />
          <Route path="/notifications" element={<Notification/>} />
          <Route path="/invites" element={<Invites/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/edit-profile" element={<EditProfile/>} />

          <Route path="/posted-job" element={<PostedJob/>} />
          <Route path="/application" element={<Applications/>} />
          <Route path="/review-applications" element={<ReviewApplications/>} />
          <Route path="/roles" element={<EmployerRoles/>} />
          <Route path="/employer-inbox" element={<EmployerInbox/>} />
        </Routes>
    </Router>
  );
}

export default App;

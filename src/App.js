import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import EmployerApplication from './pages/Employer/applications';
import EmployerInbox from './pages/Employer/Inbox';
import FindWork from './pages/find-work';
import ForgotPassword from './pages/Forgot-Password';
import Inbox from './pages/inbox';
import Invites from './pages/Invites';
import Login from './pages/Login';
import StudentApplication from './pages/applications';
import Notification from './pages/notification';
import PostedJob from './pages/Employer/posted-job';
import Profile from './pages/profile';
import EditProfile from './pages/profile/EditProfile';
import Register from './pages/Register';
import './scss/Main.scss' 
import EmployerRoles from './pages/Employer/roles';
import ReviewApplications from './pages/Employer/posted-job/review-applications';
import EmployerProfile from './pages/Employer/profile';
import EmployerEditProfile from './pages/Employer/profile/EditProfile';


function App() {
  const [role, setRole] = useState('employer')
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          {role === 'student' && <Route path="/find-work" element={<FindWork/>} />}
          {role === 'employer' && <Route path="/posted-jobs" element={<PostedJob/>} />}
          <Route path="/applications" element={<StudentApplication/>} />
          <Route path="/inbox" element={<Inbox/>} />
          <Route path="/notifications" element={<Notification/>} />
          <Route path="/invites" element={<Invites/>} />
          <Route path="/student/profile" element={<Profile/>} />
          <Route path="/employer/profile" element={<EmployerProfile/>} />
          <Route path="/employer/edit-profile" element={<EmployerEditProfile/>} />
          <Route path="/edit-profile" element={<EditProfile/>} />
          <Route path="/employer/applications" element={<EmployerApplication/>} />
          <Route path="/review-applications" element={<ReviewApplications/>} />
          <Route path="/roles" element={<EmployerRoles/>} />
          <Route path="/employer-inbox" element={<EmployerInbox/>} />
        </Routes>
    </Router>
  );
}

export default App;

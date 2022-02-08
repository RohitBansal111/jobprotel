import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import FindWork from './pages/find-work';
import ForgotPassword from './pages/Forgot-Password';
import Inbox from './pages/inbox';
import Invites from './pages/Invites';
import Login from './pages/Login';
import MyApplications from './pages/my-applications';
import Notification from './pages/notification';
import Profile from './pages/profile';
import EditProfile from './pages/profile/EditProfile';
import Register from './pages/Register';
import './scss/Main.scss'



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
          <Route path="//notifications" element={<Notification/>} />
          <Route path="/invites" element={<Invites/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/edit-profile" element={<EditProfile/>} />
        </Routes>
    </Router>
  );
}

export default App;

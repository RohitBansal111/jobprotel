import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ForgotPassword from './pages/Forgot-Password';
import JobFeed from './pages/job-feed';
import Login from './pages/Login';
import Register from './pages/Register';
import './scss/Main.scss'



function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/job-feeds" element={<JobFeed/>} />
        </Routes>
    </Router>
  );
}

export default App;

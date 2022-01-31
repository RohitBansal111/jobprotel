import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from './pages/Register';
import './scss/Main.scss'


function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Register/>}/>
        </Routes>
    </Router>
  );
}

export default App;

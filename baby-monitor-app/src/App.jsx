import React from 'react';
import{ BrowserRouter as Router , Routes, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard';
import Login from "./pages/Login";   
import Register from "./pages/Register";

 function App () {
  return (
    <Router>
    <div  className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
 }

 export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes and Route

import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import HomePage from './components/HomePage';


function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleSignUp = (redirectTo) => {
    // Navigate to the specified path after successful signup
    window.location.href = redirectTo;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setUser={setUser} />} />
        <Route path="/signup" element={<SignUpPage onSignUp={handleSignUp} />} />
        <Route path="/home" element={<HomePage user={user} onLogout={handleLogout} />} />
      </Routes>
    </Router>
  );
}

export default App;

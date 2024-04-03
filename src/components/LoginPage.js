import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === localStorage.getItem('savedEmail') && password === localStorage.getItem('savedPassword')) {
      window.location.href = '/home'; // Redirect using window.location.href
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p className="signup-link">Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}

export default LoginPage;

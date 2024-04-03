import React, { useState } from 'react';
import './SignUpPage.css'; // Import the CSS file

const SignUpPage = ({ onSignUp }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    if (!/^[A-Za-z]+$/i.test(firstName)) {
      setError('First Name should contain only alphabets');
      return;
    }
    if (!/^[A-Za-z]+$/i.test(lastName)) {
      setError('Last Name should contain only alphabets');
      return;
    }
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      setError('Invalid email format');
      return;
    }
    // Save user data to local storage
    localStorage.setItem('savedEmail', email);
    localStorage.setItem('savedPassword', password);
    // Callback to handle navigation after signup
    onSignUp('/home');
  };

  return (
    <div className="signup-container">
      <h1>Sign Up Page</h1>
      <form className="signup-form" onSubmit={handleSignUp}>
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <input type="text" placeholder="Hobbies" value={hobbies} onChange={(e) => setHobbies(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default SignUpPage;

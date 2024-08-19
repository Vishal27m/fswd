import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const MainAdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageColor, setErrorMessageColor] = useState('red');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const users = [
    { username: 'pranaesh', password: '1234', adminCode: '1' },
    { username: 'vishal', password: '1234', adminCode: '2' },
    { username: 'aditya', password: '1234', adminCode: '3' },
  ];

  const validateLogin = () => {
    const user = users.find(
      (user) =>
        user.username === username &&
        user.password === password &&
        user.adminCode === adminCode
    );

    if (user) {
      setErrorMessage('Login successful!');
      setErrorMessageColor('green');
      navigate('/admin-details-form'); // Redirect to Admin Details Form page after login
    } else {
      setErrorMessage('Invalid username, password, or admin code.');
      setErrorMessageColor('red');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Login</h2>
        <form onSubmit={(e) => { e.preventDefault(); validateLogin(); }}>
          <div className="input-container">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Admin Code"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p style={{ color: errorMessageColor }}>{errorMessage}</p>
      </div>
    </div>
  );
};

export default MainAdminLogin;

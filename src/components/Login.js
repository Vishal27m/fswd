import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    // Basic password validation
    const minLength = 8; // Minimum length for password
    const hasUpperCase = /[A-Z]/.test(password); // Must contain uppercase letter
    const hasLowerCase = /[a-z]/.test(password); // Must contain lowercase letter
    const hasNumber = /\d/.test(password); // Must contain a number

    if (password.length < minLength) {
      return 'Password must be at least 8 characters long.';
    }
    if (!hasUpperCase) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!hasLowerCase) {
      return 'Password must contain at least one lowercase letter.';
    }
    if (!hasNumber) {
      return 'Password must contain at least one number.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      return;
    }
    setPasswordError(''); // Clear previous errors

    try {
      if (isSignUp) {
        // Sign-up logic
        await axios.post('http://localhost:3000/register', { email, password });
        alert('Registration successful');
        setIsSignUp(false); // Switch to login after successful signup
      } else {
        // Login logic
        const response = await axios.post('http://localhost:3000/login', { email, password });
        localStorage.setItem('token', response.data.token);
        alert('Login successful');
        navigate('/UserDashboard'); // Navigate to the dashboard after successful login
      }
    } catch (err) {
      alert(`Error: ${err.response ? err.response.data.message : 'An error occurred'}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <button type="submit" className="login-button">
            {isSignUp ? 'SIGN UP' : 'LOGIN'}
          </button>
        </form>
        <a
          href="#"
          className="signup-link"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? 'Already have an account? Login' : 'Create a new account'}
        </a>
      </div>
    </div>
  );
};

export default Login;

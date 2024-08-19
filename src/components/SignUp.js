import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css'; // Ensure you have the correct CSS file for styling

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [photo, setPhoto] = useState(null);
  const [proof, setProof] = useState(null);
  const [district, setDistrict] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('username', username);
      formData.append('phoneNumber', phoneNumber);
      formData.append('photo', photo);
      formData.append('proof', proof);
      formData.append('district', district);

      const response = await axios.post('http://localhost:3001/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccess('Registration successful');
      setEmail('');
      setPassword('');
      setUsername('');
      setPhoneNumber('');
      setPhoto(null);
      setProof(null);
      setDistrict('');
    } catch (err) {
      setError('Error registering user');
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
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
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
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
          </div>
          <div className="input-container">
            <input
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="file"
              onChange={(e) => setProof(e.target.files[0])}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="District/Town"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button">SIGN UP</button>
        </form>
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;

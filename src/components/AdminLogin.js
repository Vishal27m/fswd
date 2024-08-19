import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [locality, setLocality] = useState('');
  const navigate = useNavigate();

  const users = [
    { email: 'pranaesh@gmail.com', password: '1234', locality: 'Annur' },
    
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(user => user.email === email && user.password === password && user.locality === locality);
    
    if (user) {
      localStorage.setItem('adminToken', 'dummy-token'); // Use a dummy token for this example
      localStorage.setItem('adminLocality', locality); // Store the locality
      alert('Admin login successful');
      navigate('/AdminDashboard');
    } else {
      alert('Invalid credentials or locality');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              placeholder="Admin Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="locality">Locality:</label>
            <select
              id="locality"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              required
            >
              <option value="" disabled>Select your locality</option>
              <option value="Annur">Annur</option>
            </select>
          </div>
          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

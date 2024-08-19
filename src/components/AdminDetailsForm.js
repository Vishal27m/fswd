import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDetailsForm.css';

const AdminDetailsForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [locality, setLocality] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(''); // Clear any previous messages

    try {
      const response = await axios.post('http://localhost:3000/admin/register', {
        email,
        password,
        locality,
      });

      if (response.status === 201) { // Assuming 201 is returned for a successful creation
        setMessage('Admin registered successfully!');
        setTimeout(() => navigate('/success'), 2000); // Navigate after showing success message
      } else {
        setMessage('Unexpected response from the server.');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        setMessage(error.response.data.message || 'Error registering admin. Please try again.');
      } else if (error.request) {
        // Request was made but no response was received
        setMessage('No response from server. Please check your connection.');
      } else {
        // Something else happened in setting up the request
        setMessage('An error occurred while registering the admin. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-details-container">
      <div className="admin-details-box">
        <h2>Register Admin</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email"
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
            <select
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              required
            >
              <option value="" disabled>Select Locality</option>
              <option value="Thudiyalur">Thudiyalur</option>
              <option value="Mettupalayam">Mettupalayam</option>
              <option value="Annur">Annur</option>
            </select>
          </div>
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register Admin'}
          </button>
        </form>
        {message && <p style={{ color: isSubmitting ? 'green' : 'red' }}>{message}</p>}
      </div>
    </div>
  );
};

export default AdminDetailsForm;

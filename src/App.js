import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserRoleSelection from './components/UserRoleSelection';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import MainAdminLogin from './components/MainAdminLogin';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import WorkerDetailsForm from './components/WorkerDetailsForm';
import WorkerDetails from './components/WorkerDetails';
import AdminDetailsForm from './components/AdminDetailsForm';
import axios from 'axios';
import './App.css';

const App = () => {
  const [workers, setWorkers] = useState([]);
  const [error, setError] = useState('');

  // Fetch workers on component mount
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/workers`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setWorkers(response.data);
      } catch (error) {
        console.error('Error fetching workers:', error);
        setError('Failed to load workers.');
      }
    };

    fetchWorkers();
  }, []); // No need for updateTrigger dependency

  const handleFormSubmit = (worker) => {
    setWorkers((prevWorkers) => [...prevWorkers, worker]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserRoleSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/mainadmin-login" element={<MainAdminLogin />} />
        <Route path="/admin-details-form" element={<AdminDetailsForm />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route
          path="/worker-details-form"
          element={<WorkerDetailsForm onSubmit={handleFormSubmit} />}
        />
        <Route
          path="/worker-details"
          element={<WorkerDetails workers={workers} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/success" element={<h2>Registration Successful!</h2>} />
      </Routes>
      {error && <div className="error-message">{error}</div>}
    </Router>
  );
};

export default App;

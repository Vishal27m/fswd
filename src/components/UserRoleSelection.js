import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserRoleSelection.css'; // Import the updated CSS file
import companyLogo from '../images/Final logo.png'; // Import the logo


function UserRoleSelection() {
  const navigate = useNavigate();

  const handleButtonClick = (role) => {
    console.log(`${role} button clicked`);
    if (role === 'People') {
      navigate('/login');
    } else if (role === 'Admin') {
      navigate('/admin-login');
    } else if (role === 'Main Admin') {
      navigate('/mainadmin-login');
    }
  };

  return (
    <div className="role-selection-container">
      <div className="header">
        <h2 className="app-name">COMMUNITY HUB</h2>
      </div>
      <div className="role-selection-box">
        <h1>Select Your Role</h1>
        <div>
          <button onClick={() => handleButtonClick('People')}>People</button>
          <button onClick={() => handleButtonClick('Admin')}>Admin</button>
          <button onClick={() => handleButtonClick('Main Admin')}>Main Admin</button>
        </div>
      </div>
    </div>
  );
}

export default UserRoleSelection;

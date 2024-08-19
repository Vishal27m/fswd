import React, { useState } from 'react';
import './UserDashboard.css';
import ComplaintForm from './ComplaintForm';
import PieChart from './PieChart';
import TownDetails from './TownDetails';
import WorkerDetails from './WorkerDetails'; // Import WorkerDetails
import ViewComplaintStatus from './ViewComplaintStatus'; // Import ViewComplaintStatus
import UserTownArticle1 from './UserTownArticle1'; 
import EventBlog from './EventBlog'; // Import EventBlog

const UserDashboard = () => {
  const [view, setView] = useState('dashboard');
  const [selectedTown, setSelectedTown] = useState(''); // Move selectedTown state here

  const handleViewChange = (view) => {
    setView(view);
  };

  const handleTownSelection = (town) => {
    setSelectedTown(town);
    setView('town');
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-sidebar">
        <div className="sidebar-logo">
          <span className="logo-icon">◆</span>
          <span className="logo-text">My Dashboard</span>
        </div>
        <ul className="sidebar-menu">
          <li onClick={() => handleViewChange('eventblog')}>
            <span className="menu-icon">💬</span> COMMUNITY HUB
          </li>
          <li onClick={() => handleViewChange('piechart')}>
            <span className="menu-icon">📊</span> WORKER DETAILS
          </li>
          <li onClick={() => handleViewChange('town')}>
            <span className="menu-icon">🏙️</span> TOWN DETAILS
          </li>
          <li onClick={() => handleViewChange('complaint')}>
            <span className="menu-icon">📝</span> COMPLAINT REGISTER
          </li>
          <li onClick={() => handleViewChange('viewcomplaint')}>
            <span className="menu-icon">📋</span> VIEW COMPLAINT STATUS
          </li>
        </ul>
      </nav>
      <main className="dashboard-main">
        <header className="main-header">
          <h1>Welcome to Your Dashboard</h1>
        </header>
        <div className="main-content">
          {view === 'complaint' && <ComplaintForm />}
          {view === 'piechart' && <WorkerDetails />}
          {view === 'town' && !selectedTown && <TownDetails onTownSelect={handleTownSelection} />}
          {view === 'town' && selectedTown && <UserTownArticle1 town={selectedTown} />}
          {view === 'viewcomplaint' && <ViewComplaintStatus />}
          {view === 'eventblog' && <EventBlog />} {/* Render EventBlog component */}
          {view === 'dashboard' && (
            <div className="dashboard-cards">
              <div className="dashboard-card">
                <span role="img" aria-label="icon">📊</span>
                <p>COMPLAINT REGISTER</p>
              </div>
              <div className="dashboard-card">
                <span role="img" aria-label="icon">📅</span>
                <p>WORKER DETAILS</p>
              </div>
              <div className="dashboard-card">
                <span role="img" aria-label="icon">💬</span>
                <p>COMMUNITY HUB</p>
              </div>
              <div className="dashboard-card">
                <span role="img" aria-label="icon">⚙️</span>
                <p>TOWN DETAILS</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;

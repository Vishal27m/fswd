import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import PieChart from './PieChart';
import ComplaintsList from './ComplaintsList';
import WorkerDetailsForm from './WorkerDetailsForm';
import TownArticle from './TownArticle';
import ViewWorkerDetails from './ViewWorkerDetails'; // Import the new component
import EventBlog from './EventBlog'; // Import EventBlog component

const AdminDashboard = () => {
  const [view, setView] = useState('dashboard');
  const [newWorker, setNewWorker] = useState(null);
  const [complaintData, setComplaintData] = useState({});
  const [locality, setLocality] = useState(localStorage.getItem('adminLocality') || ''); // Retrieve locality from local storage
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    if (view === 'complaintsList') {
      fetchComplaintsData(locality);
    }
  }, [view, locality]);

  const handleWorkerSubmit = (worker) => {
    setNewWorker(worker);
    setView('piechart');
  };

  const handleViewChange = (view) => {
    setView(view);
    if (view === 'complaintsList') {
      fetchComplaintsData(locality);
    }
  };

  const fetchComplaintsData = async (locality) => {
    try {
      const response = await fetch(`http://localhost:3000/complaints?locality=${locality}`);
      const complaints = await response.json();
      setComplaints(complaints);
      
      const complaintTypeCounts = complaints.reduce((acc, complaint) => {
        acc[complaint.type] = (acc[complaint.type] || 0) + 1;
        return acc;
      }, {});
      setComplaintData(complaintTypeCounts);
    } catch (err) {
      console.error('Error fetching complaints data:', err);
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-sidebar">
        <div className="sidebar-logo">
          <span className="logo-icon">◆</span>
          <span className="logo-text">Admin Dashboard</span>
        </div>
        <ul className="sidebar-menu">
          <li onClick={() => handleViewChange('eventBlog')}>
            <span className="menu-icon">💬</span> COMMUNITY HUB
          </li>
          <li onClick={() => handleViewChange('workerDetailsForm')}>
            <span className="menu-icon">👤</span> WORKER DETAILS
          </li>
          <li onClick={() => handleViewChange('viewWorkerDetails')}>
            <span className="menu-icon">👀</span> VIEW WORKER DETAILS
          </li>
          <li onClick={() => handleViewChange('town')}>
            <span className="menu-icon">🏙️</span> VIEW & EDIT TOWN DETAILS
          </li>
          <li onClick={() => handleViewChange('complaintsList')}>
            <span className="menu-icon">📝</span> VIEW & EDIT COMPLAINTS
          </li>
          
        </ul>
      </nav>
      <div className="dashboard-content">
        {view === 'dashboard' && (
          <div>
            <h1>Welcome to the Admin Dashboard</h1>
            <p>Select an option from the sidebar to get started.</p>
          </div>
        )}
        {view === 'workerDetailsForm' && <WorkerDetailsForm onSubmit={handleWorkerSubmit} />}
        {view === 'viewWorkerDetails' && <ViewWorkerDetails />} {/* Render the ViewWorkerDetails component */}
        {view === 'piechart' && complaintData && <PieChart data={complaintData} />}
        {view === 'complaintsList' && <ComplaintsList complaints={complaints} />}
        {view === 'town' && <TownArticle />}
        {view === 'eventBlog' && <EventBlog />} {/* Render the EventBlog component */}
      </div>
    </div>
  );
};

export default AdminDashboard;

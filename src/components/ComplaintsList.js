import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PieChart from './PieChart'; // Import PieChart component

import './ComplaintsList.css'; // Import CSS file for styling

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaintForm, setComplaintForm] = useState({
    status: 'Pending',
    photo: null,
  });

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/complaints', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const sortedComplaints = response.data.sort((a, b) => {
          const severityOrder = { Low: 1, Medium: 2, High: 3 };
          return severityOrder[b.severity] - severityOrder[a.severity];
        });

        setComplaints(sortedComplaints);
      } catch (err) {
        console.error('Error fetching complaints:', err);
        setError('Error fetching complaints');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleViewClick = (complaint) => {
    setSelectedComplaint(complaint);
    setComplaintForm({
      status: complaint.status || 'Pending',
      photo: null,
    });
  };

  const handleFileChange = (e) => {
    setComplaintForm({
      ...complaintForm,
      photo: e.target.files[0],
    });
  };

  const handleUpdateClick = async () => {
    const { _id } = selectedComplaint;
    try {
      const token = localStorage.getItem('token');
      const formDataToUpdate = new FormData();
      formDataToUpdate.append('status', complaintForm.status);
      if (complaintForm.photo) {
        formDataToUpdate.append('photo', complaintForm.photo);
      }

      await axios.put(`http://localhost:3000/update-complaint/${_id}`, formDataToUpdate, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setComplaints(
        complaints.map((complaint) =>
          complaint._id === _id ? { ...complaint, ...complaintForm } : complaint
        )
      );

      setSelectedComplaint(null);
      setComplaintForm({
        status: 'Pending',
        photo: null,
      });
    } catch (err) {
      console.error('Error updating complaint:', err);
      setError('Error updating complaint');
    }
  };

  const handleCancelClick = () => {
    setSelectedComplaint(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Group complaints by type
  const groupedComplaints = complaints.reduce((acc, complaint) => {
    if (!acc[complaint.type]) {
      acc[complaint.type] = [];
    }
    acc[complaint.type].push(complaint);
    return acc;
  }, {});

  // Prepare data for pie chart
  const complaintTypeCounts = complaints.reduce((acc, complaint) => {
    acc[complaint.type] = (acc[complaint.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="complaints-container">
      <h2>Complaints Management</h2>

      {/* Pie chart for complaints by type */}
      <div className="pie-chart-section">
        <h3>Complaints Distribution by Type</h3>
        <PieChart data={complaintTypeCounts} />
      </div>

      {Object.keys(groupedComplaints).map((type) => (
        <div key={type} className="complaint-type-section">
          <h3>{type}</h3>
          <div className="complaints-table-wrapper">
            <table className="complaints-table">
              <thead>
                <tr>
                  <th>Complaint ID</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {groupedComplaints[type].map((complaint) => (
                  <tr key={complaint._id}>
                    <td>{complaint.complaintID}</td>
                    <td>{complaint.description}</td>
                    <td>{new Date(complaint.date).toLocaleDateString()}</td>
                    <td>{complaint.severity}</td>
                    <td>{complaint.status}</td>
                    <td>
                      <button className="view-button" onClick={() => handleViewClick(complaint)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {selectedComplaint && (
        <div className="modal">
          <h3>Edit Complaint</h3>
          <form onSubmit={(e) => e.preventDefault()} className="modal-form">
            <label>Status:</label>
            <select
              value={complaintForm.status}
              onChange={(e) => setComplaintForm({ ...complaintForm, status: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
            <label>Photo:</label>
            <input
              type="file"
              accept="image/jpeg, image/png, application/pdf"
              onChange={handleFileChange}
            />
            {selectedComplaint.photo && (
              <div className="file-preview">
                <h4>Uploaded File:</h4>
                <a href={`http://localhost:3000/uploads/${selectedComplaint.photo}`} target="_blank" rel="noopener noreferrer">
                  View File
                </a>
              </div>
            )}
            <div className="modal-buttons">
              <button type="button" onClick={handleUpdateClick}>Update</button>
              <button type="button" onClick={handleCancelClick}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ComplaintsList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewComplaintStatus.css'; // Import the CSS file

const ViewComplaintStatus = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/complaints', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComplaints(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching complaints:', error);
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="complaint-status-container">
      <h2>Your Complaint Status</h2>
      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <div className="complaints-grid">
          {complaints.map((complaint) => (
            <div className="complaint-box" key={complaint._id}>
              <p><strong>ID:</strong> {complaint.complaintID}</p>
              <p><strong>Type:</strong> {complaint.type}</p>
              <p><strong>Description:</strong> {complaint.description}</p>
              <p><strong>Date:</strong> {new Date(complaint.date).toLocaleDateString()}</p>
              <p><strong>Severity:</strong> {complaint.severity}</p>
              <p><strong>Status:</strong> <span className={`status ${complaint.status.toLowerCase()}`}>{complaint.status}</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewComplaintStatus;

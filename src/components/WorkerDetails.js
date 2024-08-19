// src/components/WorkerDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WorkerDetails.css';

const WorkerDetails = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/workers'); // Adjust URL if needed
        setWorkers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch workers');
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="worker-details">
      <h2>Worker Details</h2>
      {workers.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Domain</th>
              <th>Photo</th>
              <th>Proof</th>
            </tr>
          </thead>
          <tbody>
            {workers.map(worker => (
              <tr key={worker._id}>
                <td>{worker.name}</td>
                <td>{worker.phone}</td>
                <td>{worker.email}</td>
                <td>{worker.designation}</td>
                <td>{worker.domain}</td>
                <td>{worker.photoUrl && <img src={`http://localhost:3000/${worker.photoUrl}`} alt="Worker Photo" width="100" />}</td>
                <td>{worker.proofUrl && <a href={`http://localhost:3000/${worker.proofUrl}`} target="_blank" rel="noopener noreferrer">View Proof</a>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No worker details available.</p>
      )}
    </div>
  );
};

export default WorkerDetails;

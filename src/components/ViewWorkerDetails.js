import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewWorkerDetails.css';

const ViewWorkerDetails = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/workers');
        setWorkers(response.data);
      } catch (error) {
        console.error('Error fetching workers:', error);
      }
    };

    fetchWorkers();
  }, []);

  return (
    <div className="view-worker-details">
      <h2>Worker Details</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Photo</th>
            <th>Proof</th>
            <th>Designation</th>
            <th>Domain</th>
          </tr>
        </thead>
        <tbody>
          {workers.map(worker => (
            <tr key={worker._id}>
              <td>{worker.name}</td>
              <td>{worker.phone}</td>
              <td>{worker.email}</td>
              <td>{worker.photo}</td>
              <td>{worker.proof}</td>
              <td>{worker.designation}</td>
              <td>{worker.domain}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewWorkerDetails;

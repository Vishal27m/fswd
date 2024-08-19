import React, { useState } from 'react';
import axios from 'axios';
import './ComplaintForm.css';

const ComplaintForm = () => {
  const [complaint, setComplaint] = useState({
    name: '',
    phone: '',
    address: '',
    type: '',
    description: '',
    severity: 'Low',
    status: 'Pending',
    locality: ''
  });

  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset success message when user starts typing
    setSuccess('');

    // Clear specific error when the corresponding field is filled
    if (value.trim() !== '') {
      setError('');
    }

    setComplaint({ ...complaint, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Example: 10-digit phone number
    return phoneRegex.test(phone);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    if (!complaint.name || !complaint.phone || !complaint.address || !complaint.type || 
        !complaint.description || !complaint.severity || !complaint.locality) {
      setError('Please fill out all required fields.');
      setSuccess('');
      return;
    }

    // Custom validation for phone number
    if (!isValidPhoneNumber(complaint.phone)) {
      setError('Please enter a valid 10-digit phone number.');
      setSuccess('');
      return;
    }

    const formData = new FormData();
    formData.append('name', complaint.name);
    formData.append('phone', complaint.phone);
    formData.append('address', complaint.address);
    formData.append('type', complaint.type);
    formData.append('description', complaint.description);
    formData.append('severity', complaint.severity);
    formData.append('status', complaint.status);
    formData.append('locality', complaint.locality);
    if (photo) {
      formData.append('photo', photo);
    }

    const token = localStorage.getItem('token'); // Retrieve JWT token

    axios.post('http://localhost:3000/register-complaint', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setSuccess('Complaint submitted successfully!');
      setComplaint({
        name: '',
        phone: '',
        address: '',
        type: '',
        description: '',
        severity: 'Low',
        status: 'Pending',
        locality: ''
      });
      setPhoto(null);
      setError('');
    })
    .catch(error => {
      console.error('There was an error submitting the complaint!', error);
      setError('Error submitting complaint. Please try again.');
      setSuccess('');
    });
  };

  return (
    <div className="complaint-form-container">
      <h2>Register Complaint</h2>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="complaint-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={complaint.name}
              onChange={handleChange}
              required
            />
            {error && !complaint.name && <p className="error-message">Name is required.</p>}
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={complaint.phone}
              onChange={handleChange}
              required
            />
            {error && !complaint.phone && <p className="error-message">Phone number is required.</p>}
            {error && complaint.phone && !isValidPhoneNumber(complaint.phone) && (
              <p className="error-message">Please enter a valid 10-digit phone number.</p>
            )}
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={complaint.address}
              onChange={handleChange}
              required
            />
            {error && !complaint.address && <p className="error-message">Address is required.</p>}
          </div>
          <div className="form-group">
            <label>Type of Complaint</label>
            <select
              name="type"
              value={complaint.type}
              onChange={handleChange}
              required
            >
              <option value="">Select...</option>
              <option value="Electricity">Electricity</option>
              <option value="Water Scarcity">Water Scarcity</option>
              <option value="Garbage">Garbage</option>
              <option value="Road Damage">Road Damage</option>
              <option value="Noise Pollution">Noise Pollution</option>
            </select>
            {error && !complaint.type && <p className="error-message">Type of complaint is required.</p>}
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={complaint.description}
              onChange={handleChange}
              required
            ></textarea>
            {error && !complaint.description && <p className="error-message">Description is required.</p>}
          </div>
          <div className="form-group">
            <label>Severity</label>
            <select
              name="severity"
              value={complaint.severity}
              onChange={handleChange}
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {error && !complaint.severity && <p className="error-message">Severity is required.</p>}
          </div>
          <div className="form-group">
            <label>Locality</label>
            <select
              name="locality"
              value={complaint.locality}
              onChange={handleChange}
              required
            >
              <option value="">Select...</option>
              <option value="Annur">Annur</option>
            </select>
            {error && !complaint.locality && <p className="error-message">Locality is required.</p>}
          </div>
          <div className="form-group">
            <label>Upload Photo (optional)</label>
            <input
              type="file"
              name="photo"
              onChange={handlePhotoChange}
              accept="image/*"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;

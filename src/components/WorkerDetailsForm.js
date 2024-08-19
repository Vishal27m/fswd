import React, { useState } from 'react';
import axios from 'axios';
import './WorkerDetailsForm.css';

const WorkerDetailsForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');
  const [domain, setDomain] = useState('');
  const [photo, setPhoto] = useState(null);
  const [proof, setProof] = useState(null);
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState({});

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    if (name === 'photo') {
      setPhoto(files[0]);
    } else if (name === 'proof') {
      setProof(files[0]);
    }
  };

  const validate = () => {
    let errors = {};

    if (!name.trim()) {
      errors.name = 'Name is required';
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      errors.phone = 'Phone must be a 10-digit number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Invalid email format';
    }

    if (!designation.trim()) {
      errors.designation = 'Designation is required';
    }

    if (!domain.trim()) {
      errors.domain = 'Domain is required';
    }

    if (!photo) {
      errors.photo = 'Photo is required';
    }

    if (!proof) {
      errors.proof = 'Proof is required';
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setMessage('Please correct the errors before submitting');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('designation', designation);
    formData.append('domain', domain);
    if (photo) formData.append('photo', photo);
    if (proof) formData.append('proof', proof);

    try {
      const response = await axios.post('http://localhost:3000/register-worker', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Worker details saved successfully');

      // Reset form fields
      setName('');
      setPhone('');
      setEmail('');
      setDesignation('');
      setDomain('');
      setPhoto(null);
      setProof(null);
      setErrors({}); // Clear any errors

      // Reset file inputs
      document.querySelector('input[name="photo"]').value = '';
      document.querySelector('input[name="proof"]').value = '';

    } catch (error) {
      setMessage('Error saving worker details');
    }
  };

  return (
    <div className="worker-details-form">
      <h2>Register Worker</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </label>
        <label>
          Phone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </label>
        <label>
          Designation:
          <input
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
          />
          {errors.designation && <p className="error">{errors.designation}</p>}
        </label>
        <label>
          Domain:
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
          />
          {errors.domain && <p className="error">{errors.domain}</p>}
        </label>
        <label>
          Photo:
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            required
          />
          {errors.photo && <p className="error">{errors.photo}</p>}
        </label>
        <label>
          Proof:
          <input
            type="file"
            name="proof"
            onChange={handleFileChange}
            required
          />
          {errors.proof && <p className="error">{errors.proof}</p>}
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WorkerDetailsForm;

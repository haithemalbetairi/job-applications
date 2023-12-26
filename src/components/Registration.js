// Registration.js
import React, { useState } from 'react';

const Registration = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'job_hunter',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration data submitted:', formData);
    onLogin();
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Password"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>User Type:</label>
          <div className='form-group'>
            <input
              type="radio"
              name="userType"
              value="job_hunter"
              checked={formData.userType === 'job_hunter'}
              onChange={handleChange}
            />
            <label>
              Job Hunter
            </label>
            <input
              type="radio"
              name="userType"
              value="recruiter"
              checked={formData.userType === 'recruiter'}
              onChange={handleChange}
            />
            <label>
              Recruiter
            </label>
          </div>
        </div>
        <button type="submit" className='apply-button'>Register</button>
      </form>
    </div>
  );
};

export default Registration;

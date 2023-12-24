// Registration.js
import React, { useState } from 'react';
import './Registration.css'; // Import the CSS file

const Registration = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
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
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>User Type:</label>
          <div>
            <label>
              <input
                type="radio"
                name="userType"
                value="job_hunter"
                checked={formData.userType === 'job_hunter'}
                onChange={handleChange}
              />
              Job Hunter
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="userType"
                value="recruiter"
                checked={formData.userType === 'recruiter'}
                onChange={handleChange}
              />
              Recruiter
            </label>
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;

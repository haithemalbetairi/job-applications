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
            placeholder="Email"
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
          <label><strong>User Type:</strong></label>
            <label>
              Job Hunter
              <input
                type="checkbox"
                name="userType"
                value="job_hunter"
                checked={formData.userType === 'job_hunter'}
                onChange={handleChange}
              />
            </label>
            <label>
              Recruiter
              <input
                type="checkbox"
                name="userType"
                value="recruiter"
                checked={formData.userType === 'recruiter'}
                onChange={handleChange}
              />
            </label>
        </div>
        <button type="submit" className='apply-button'>Register</button>
      </form>
    </div>
  );
};

export default Registration;

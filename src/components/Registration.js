// Registration.js
import React, { useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyA0nP2NYmqe-3ZCurR74QL_JgWklFPOIVw",
  authDomain: "job-posting-409011.firebaseapp.com",
  projectId: "job-posting-409011",
  storageBucket: "job-posting-409011.appspot.com",
  messagingSenderId: "848172609833",
  appId: "1:848172609833:web:d50da1a1cd7e97346c8738",
  measurementId: "G-G7YJ0X7PRN"
};

firebase.initializeApp(firebaseConfig);

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
    const register = async (email, password) => {
      try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        return userCredential.user;
      } catch (error) {
        console.error("Registration error:", error);
        throw error;
      }
    };
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

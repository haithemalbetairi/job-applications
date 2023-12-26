// src/components/Login.js
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

const Login = ({ onLogin, onRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    const login = async (email, password) => {
      try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        return userCredential.user;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    };
    console.log('Login data submitted:', formData);
    onLogin(); // Assume successful login
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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
        <button className="apply-button" type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <button type="button" className="apply-button" onClick={onRegister}>
          Register
        </button>
      </p>
    </div>
  );
};

export default Login;

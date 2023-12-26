// src/components/Login.js
import React, { useState } from 'react';

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
    // Add your login logic here, e.g., send the data to an authentication API
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

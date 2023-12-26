import React, { useState, useEffect } from 'react';
import Login from './Login';
import JobListing from './JobListing';
import Registration from './Registration';



const Content = () => {
  const [isLoggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem('isLoggedIn')) || false
  );
  const [isRegistering, setRegistering] = useState(
    JSON.parse(localStorage.getItem('isRegistering')) || false
  );

  const handleToggleLogin = () => {
    setLoggedIn((prev) => !prev);
    setRegistering(false); // Reset registration state when logging in
  
  };

  const handleToggleRegistration = () => {
    setRegistering((prev) => !prev);

  };
  return (
    <div className="container">
    
      {isLoggedIn ? (
        <JobListing items={jobPostingData} />
      ) : isRegistering ? (
        <Registration onLogin={handleToggleLogin} />
      ) : (
        <Login
          onLogin={handleToggleLogin}
          onRegister={handleToggleRegistration}
        />
      )}
    </div>
  );
};

export default Content;

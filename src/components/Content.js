import React, { useState } from 'react';
import Login from './Login';
import JobListing from './JobListing';
import Registration from './Registration';

const Content = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isRegistering, setRegistering] = useState(false);
  
    // Toggle the login state for demonstration purposes
    const handleToggleLogin = () => {
      setLoggedIn((prev) => !prev);
      setRegistering(false); // Reset registration state when logging in
    };
  
    // Toggle the registration state for demonstration purposes
    const handleToggleRegistration = () => {
      setRegistering((prev) => !prev);
    };
    return (
        <div className="container">
            {/* Conditionally render Login, Registration, or JobListing based on state */}
            {isLoggedIn ? (
                <JobListing />
            ) : isRegistering ? (
                <Registration onLogin={handleToggleLogin} />
            ) : (
                <Login onLogin={handleToggleLogin} onRegister={handleToggleRegistration} />
            )}

            {/* Additional content or components */}
        </div>
    );
};

export default Content;
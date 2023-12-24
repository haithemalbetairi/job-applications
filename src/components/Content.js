import React, { useState } from 'react';
import Login from './Login';
import JobListing from './JobListing';
import Registration from './Registration';

const Content = (isLoggedIn, isRegistering) => {
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
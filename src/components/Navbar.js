// src/components/Navbar.js
import React, { useState } from 'react';
import JobForm from './JobForm';

const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleToggleClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <div className="navbar">
      <div className='job-form'>
        <button type="button">Home</button>
        <button type="button" onClick={handleToggleClick}>
          Post a Job
        </button>
        {isClicked ? <JobForm state={handleToggleClick} /> : null}
      </div>
    </div>
  );
};

export default Navbar;

import React, { useState } from 'react';
import Login from './Login';
import JobListing from './JobListing';
import Registration from './Registration';

let jobIdCounter = 1;


const jobPostingData = [
  {
    jobId: '' + jobIdCounter++,
    recruiterId: '12345',
    title: 'Software Engineer',
    description: 'Exciting software',
    requirement: ['B.S. degree in computer science', 'Experience with Java'],
    deadline: '2023-12-25',
  },
  {
    jobId: '' + jobIdCounter++,
    recruiterId: '12345',
    title: 'Web Developer',
    description: 'Exciting...',
    requirement: [
      'B.S. degree in computer science',
      'Experience with JavaScript',
    ],
    deadline: '2023-12-25',
  },
];

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
    // localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    // useEffect(() => {
    //   localStorage.setItem(
    //     'isLoggedIn',
    //     JSON.stringify((prev) => !prev)
    //   );
    // }, [isLoggedIn]);
    // useEffect(() => {
    //   localStorage.setItem('isRegistering', JSON.stringify(false));
    // }, [isRegistering]);
  };

  const handleToggleRegistration = () => {
    setRegistering((prev) => !prev);
    // useEffect(() => {
    //   localStorage.setItem(
    //     'isRegistering',
    //     JSON.stringify((prev) => !prev)
    //   );
    // }, [isRegistering]);
  };
  return (
    <div className="container">
      {/* Conditionally render Login, Registration, or JobListing based on state */}
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

      {/* Additional content or components */}
    </div>
  );
};

export default Content;

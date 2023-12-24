// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Footer from './components/Footer';
import { useState } from 'react';

const App = () => {
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
    <>
      <Header />
      <Navbar />
      <Content isLoggedIn={useState(false)} isRegistering= {useState(false)}/>
      <Footer />
    </>
  );
};

export default App;

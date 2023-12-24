// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Footer from './components/Footer';
import { useState } from 'react';

const App = () => {
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

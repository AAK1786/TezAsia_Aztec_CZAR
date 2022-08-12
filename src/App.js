import React, { Component }  from 'react';
// import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import Deposit from './components/deposit';
import Loan from './components/loan';
function App() {
  return (
    <>
    <Navbar />
    <Deposit />
    <Loan/>
    </>
  );
}

export default App;

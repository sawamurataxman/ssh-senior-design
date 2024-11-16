//import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import BulbPage from './pages/BulbPage';
import Navbar from './components/Navbar';

import TimeDisplay from './TimeTest';
import StringSender from './StringTest';

function App() {
  return (
    <div>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/bulb" element={<BulbPage />} />
          </Routes>
        </div>
      </Router>
      <br />
      {/*<StringSender />*/}
      <br />
      {/*<TimeDisplay />*/}
    </div>
  );
}

export default App;

import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';


function Suggest() {
    return (
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' exact component={Suggest} />
          </Routes>
        </Router>
      </>
    );
  }
 
 export default Suggest;
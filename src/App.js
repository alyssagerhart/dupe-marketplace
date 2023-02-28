import React from 'react'
import Homepage from './Pages/Homepage'
import Navbar from './components/Navbar/Navbar'
import Suggest from './Pages/Suggest'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
   return (
     <>
       <Router>
         <Navbar />
         <Routes>
         <Route exact path="/" element={<Homepage/>} />
         <Route exact path="/suggest" element={<Suggest/>} />
         </Routes>
       </Router>
     </>
   );
 }

export default App;

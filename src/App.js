import React from 'react'
import Homepage from './Pages/Homepage'
import Navbar from './components/Navbar/Navbar'
import Suggest from './Pages/Suggest'
import SearchCat from './Pages/SearchCat'
import DetailProductPage from './Pages/DetailProductPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
   return (
     <>
       <Router>
         <Navbar />
         <Routes>
         <Route exact path="/" element={<Homepage/>} />
         <Route exact path="/suggest" element={<Suggest/>} />
         <Route exact path="/search" element={<SearchCat/>} />
          <Route exact path="/search/:product.Id" element={<DetailProductPage/>} />
         </Routes>
       </Router>
     </>
   );
 }

export default App;

import React from 'react'
import Homepage from './Pages/Homepage'
import Navbar from './components/Navbar/Navbar'
import Suggest from './Pages/Suggest'
import Home from './components/Home/Home'
import Comparison from './components/Comparisons/Comparisons'
import Story from './components/Story/Story'
import Categories from './components/Categories/Categories'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
   return (
     <>
       <Router>
         <Navbar />
         <Home />
         <Categories />
         <Comparison />
         <Story />
         <Routes>
           <Route path='/' exact component={Homepage} />
           <Route path='/suggest' exact component={Suggest} />
         </Routes>
       </Router>
     </>
   );
 }

export default App;

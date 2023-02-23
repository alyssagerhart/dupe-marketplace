import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Comparisons from './components/Comparisons/Comparisons'
import Search from './components/Search/Search'
import Categories from './components/Categories/Categories'
import Suggest from './components/Suggest/Suggest'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
     <div>
        <div>
          <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Suggest" element={<Suggest />} />
            <Route path="/Search" element={<Search />} />
          </Routes>
          </BrowserRouter>
        </div>
      <Home />
      <Categories />
      <Comparisons />
      <Search />
    </div>
  );
}

export default App;

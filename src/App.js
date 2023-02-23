import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Comparisons from './components/Comparisons/Comparisons'
import Search from './components/Search/Search'
import Categories from './components/Categories/Categories'

function App() {
  return (
     <div>
      <Navbar />
      <Hero />
      <Categories />
      <Comparisons />
      <Search />
    </div>
  );
}

export default App;

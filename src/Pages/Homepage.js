import React from 'react'
import Home from '../components/Home/Home'
import Comparisons from '../components/Comparisons/Comparisons'
import Story from '../components/Story/Story'
import Categories from '../components/Categories/Categories'


function Homepage() {
  return (
     <div>
        <Home />
        <Categories />
        <Comparisons />
        <Story />
      </div>
  );
}

export default Homepage;


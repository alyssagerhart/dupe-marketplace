import React from 'react';
import './Search.css';

function Search() {
 const handleCategoryClick = (category) => {
    console.log(`Clicked on ${category} category`);
  }

  return (
    <div className="category-options">
      <h1>Select a Category</h1>
      <ul className="category-list">
        <li onClick={() => handleCategoryClick('leggings')}>Leggings</li>
        <li onClick={() => handleCategoryClick('makeup')}>Makeup</li>
        <li onClick={() => handleCategoryClick('perfume')}>Perfume</li>
      </ul>
    </div>
  );
}

export default Search;
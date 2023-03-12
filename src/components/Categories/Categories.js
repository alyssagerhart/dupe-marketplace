import React from 'react';
import Leggings from '../../assets/leggings.webp';
import MakeUp from '../../assets/makeup.webp';
import Perfume from '../../assets/perfume.jpg';
import { Link } from 'react-router-dom';
import {category} from '../../Pages/SearchCat';



function Comparisons() {
  return (
    <div className='comparisons'>
      <div className='container'>
        <h1>Choose from any of our Categories</h1>
        <div className='img-container'>
        <Link to={`/search/${category.Leggings}`}>
             <img src={Leggings} alt='Leggings' />
        </Link>
        <Link to={`/search/${category.MakeUp}`}>
            <img src={MakeUp} alt='Make-Up' />
        </Link>
        <Link to={`/search/${category.Perfume}`}>
            <img src={Perfume} alt='Perfume' />
        </Link>
        </div>
      </div>
    </div>
  );
}

export default Comparisons;

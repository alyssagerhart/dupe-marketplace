import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ products, cart }) => {
  const [itemFound, setItemFound] = useState(null);
  const { itemToShow } = useParams();

  useEffect(() => {
    const foundItem = products.find(item => item.id === itemToShow);
    setItemFound(foundItem);
  }, [products, itemToShow]);

  return (
    <div>
      <p>The URL value of key "itemToShow" is: {itemToShow}</p>
      {itemFound ? (
        <>
          <img src={itemFound.pic} alt="product-details" />  
          <h1>{itemFound.name}</h1>
          <p>In Cart: {cart.filter(item => item.id === itemFound.id).length}</p>
          <p>Product Id: {itemFound.id}</p>
          <p>{itemFound.description}</p>
          <p>${itemFound.price}</p>
        </>
      ) : (
        <p>Item not found</p>
      )}
    </div>
  );
};

export default ProductDetails;

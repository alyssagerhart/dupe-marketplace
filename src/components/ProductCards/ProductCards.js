import React from 'react';

function ProductCards(props) {
    const { name, description, brandname, id, imageUrl } = props.product;
    
    return (
        <div className="product-card">
            <div className="product-image">
                <img src={imageUrl} alt={name} />
            </div>
            <div className="product-details">
                <h3>{name}</h3>
                <p>{description}</p>
                <p>{brandname}</p>
            </div>
        </div>
    )
}

export default ProductCards;
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useLocation } from "react-router-dom";
import "./SearchCat.css";

function SearchCat() {
  const [details, setDetails] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const location = useLocation();
  const [, setProducts] = useState([]);

  useEffect(() => {
    const brandname = new URLSearchParams(location.search).get("brandname");
    const fetchProducts = async () => {
      const q = query(
        collection(db, "products"),
        where("brandname", "==", brandname)
      );
      const querySnapshot = await getDocs(q);
      const productsData = [];
      querySnapshot.forEach((doc) => {
        productsData.push({ ...doc.data(), id: doc.id });
      });
      setProducts(productsData);
    };
    fetchProducts();
  }, [location]);

  const userData = async (selectedCategory) => {
    const q = query(collection(db, "products"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setDetails(selectedCategory ? data.filter((product) => product.category === selectedCategory) : data);
  };

  useEffect(() => {
    userData();
  }, []);

  const filteredData = details.filter(
    (product) => selectedCategory === null || product.category === selectedCategory
  );

  const groupedData = filteredData.reduce((acc, curr) => {
    if (curr.category in acc) {
      acc[curr.category].push(curr);
    } else {
      acc[curr.category] = [curr];
    }
    return acc;
  }, {});

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === "All Products" ? null : category);
    userData(category === "All Products" ? null : category);
  };

  return (
    <div className="container">
      <div className="sidebar" style={{position:"absolute", top: "150px", left:"15px"}}>
        <div class="filter-sort">
          <h2>Filter & Sort</h2>
          <form>
            <h3>Sort by:</h3>
            <label>
              <input type="radio" name="sort" value="all-products" onChange={() => handleCategoryClick('All Products')} checked={selectedCategory === null}/>
              All Products
            </label>
            <label>
              <input type="radio" name="sort" value="type-L" onChange={() => handleCategoryClick('Leggings')} checked={selectedCategory === 'Leggings'}/>
              Category: Leggings
            </label>
            <label>
              <input type="radio" name="sort" value="type-M" onChange={() => handleCategoryClick('Make-up')} checked={selectedCategory === 'Make-up'}/>
              Category: Make-up
            </label>
            <label>
              <input type="radio" name="sort" value="type-P" onChange={() => handleCategoryClick('Perfume')} checked={selectedCategory === 'Perfume'}/>
              Category: Perfume
            </label>
          </form>
</div>

      </div>
      <div className="main">
        <div className="background" style={{position:"absolute", left: "20%", top:"80px"}}>
          {Object.entries(groupedData).map(([category, products]) => (
            <div
              key={category}
              style={{
                padding: "10px",
                borderRadius: "5px",
                margin: "10px 0",
              }}
            >
              <p className={`category-${category.toLowerCase().replace(/\s/g, "-")}`} style={{ fontSize: "18px", fontWeight: "bold", margin: "0" }}>
              {category}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
  {products.map((product) => (
    <div
      key={product.id}
      className={`product-${product.name.toLowerCase().replace(/\s/g, "-")}`}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "5px",
        margin: "10px",
        flexBasis: "45%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <a href={`search/${product.id}`}>
        <img
          style={{
            margin: "0 auto",
            height: "150px",
            width: "150px",
          }}
          src={product.photoUrl}
          alt="product"
        />
      </a>
      <a href={product.link}>
        <div style={{ flexGrow: "1", textAlign: "center" }}>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              margin: "0",
            }}
          >
            {product.name}
          </p>
          <p style={{ fontSize: "16px", margin: "0" }}>
            {product.brandname}
          </p>
          <p style={{ fontSize: "14px", margin: "0" }}>
            {product.description} <br></br>CLICK HERE TO BUY
          </p>
        </div>
      </a>
    </div>
  ))}
</div>
            
            </div>
          ))}
        </div>
      </div>
    </div>

  )          

}


export const category = {
  Leggings: 'Leggings',
  MakeUp: 'Make-up',
  Perfume: 'Perfume',
};

export default SearchCat;

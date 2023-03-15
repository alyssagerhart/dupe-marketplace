import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useLocation } from "react-router-dom";
import "./SearchCat.css";
import { Link } from "react-router-dom";


function SearchCat() {

  //set up state variables
  const [details, setDetails] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const location = useLocation();
  const [, setProducts] = useState([]);

//searches the brand name component for the equal brandname from firebase
// and adds the data to the productsData array
// then sets the products state variable to the productsData array
// this is used to display the products on the page
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

  // creates a firebase query to get all the products passing in the products collection
  // then it retrieves the data from the query and adds the id to the data
  // then it sets the details state variable to the data
  // this is used to display the products on the page
  const userData = async (selectedCategory) => {
    const q = query(collection(db, "products"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setDetails(selectedCategory ? data.filter((product) => product.category === selectedCategory) : data);
  };

  // calls the userData function when the page loads
  useEffect(() => {
    userData();
  }, []);

  // filters the data by the selected category
  const filteredData = details.filter(
    (product) => selectedCategory === null || product.category === selectedCategory
  );

  // groups the data by category
  const groupedData = filteredData.reduce((acc, curr) => {
    if (curr.category in acc) {
      acc[curr.category].push(curr);
    } else {
      acc[curr.category] = [curr];
    }
    return acc;
  }, {});

  // handles the category click if they click All products it changes the selected category to show all products
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
    <Link to={`/details/${product.id}`}>
      <img
        style={{
          margin: "0 auto",
          height: "150px",
          width: "150px",
        }}
        src={product.photoUrl}
        alt={product.name}
      />
    </Link>
    <Link to={product.link}>
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
    </Link>
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

export default SearchCat;

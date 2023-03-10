import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useLocation } from "react-router-dom";
import "./SearchCat.css";

function SearchCat() {
  const [details, setDetails] = useState([]);
  const location = useLocation();
  const [products, setProducts] = useState([]);

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

  const userData = async () => {
    const q = query(collection(db, "products"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setDetails(data);
  };

  useEffect(() => {
    userData();
  }, []);

  const groupedData = details.reduce((acc, curr) => {
    if (curr.category in acc) {
      acc[curr.category].push(curr);
    } else {
      acc[curr.category] = [curr];
    }
    return acc;
  }, {});

  return (
    <div className="container">
      <div className="sidebar" style={{position:"absolute", top: "150px", left:"15px"}}>
      <div class="filter-sort">
  <h2>Filter & Sort</h2>
  <form>
    <h3>Sort by:</h3>
    <label>
      <input type="radio" name="sort" value="name-asc" />
      Name (A-Z)
    </label>
    <label>
      <input type="radio" name="sort" value="name-desc" />
      Name (Z-A)
    </label>
    <label>
      <input type="radio" name="sort" value="type-L" />
      Category: Leggings
    </label>
    <label>
      <input type="radio" name="sort" value="type-M" />
      Category: Make-up
    </label>
    <label>
      <input type="radio" name="sort" value="type-P" />
      Category: Perfume
    </label>

    <h3>Filter by:</h3>
    <label>
      <input type="checkbox" name="color" value="red" />
      Red
    </label>
    <label>
      <input type="checkbox" name="color" value="blue" />
      Blue
    </label>
    <label>
      <input type="checkbox" name="color" value="green" />
      Green
    </label>
    
    <label>
      <input type="checkbox" name="type" value="shirt" />
      Shirt
    </label>
    <label>
      <input type="checkbox" name="type" value="pants" />
      Pants
    </label>
    <label>
      <input type="checkbox" name="type" value="shoes" />
      Shoes
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
              <p style={{ fontSize: "18px", fontWeight: "bold", margin: "0" }}>
                {category}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {products.map((product) => (
                  <div
                    key={product.id}
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
                    <a href={product.link}>
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
                        {product.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchCat;
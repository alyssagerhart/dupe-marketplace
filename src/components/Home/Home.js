import React, { useState } from 'react'
import './HomeStyles.css'
import { db } from '../../firebase/firebase'
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Video from '../../assets/shoppingtl.mp4'

const productsRef = collection(db, "products");




function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [details, setDetails] = useState([]);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);


    const handleDropdownSelect = (selectedOption) => {
      setSearchTerm(selectedOption);
      navigate.push(`/search?brandname=${selectedOption}`);
    };
  
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
  
    const handleSearch = async (event) => {
      event.preventDefault();
      const q = query(productsRef, where("brandname", "==", searchTerm));
      const querySnapshot = await getDocs(q);
      const options = [];
      querySnapshot.forEach((doc) => {
        const brand = doc.data().brandname;
        if (!options.includes(brand)) {
          options.push(brand);
        }
      });
      setDropdownOptions(options);
  
      const filteredDupes = details.filter((dupe) =>
        dupe.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(filteredDupes);
    };
  
    const groupedData = details.reduce((acc, curr) => {
      if (curr.category in acc) {
        acc[curr.category].push(curr);
      } else {
        acc[curr.category] = [curr];
      }
      return acc;
    }, {});
  
    const handleInputChange = async (event) => {
      const input = event.target.value;
      setSearchTerm(input);
      if (input.length > 0) {
        const q = query(productsRef, where("brandname", ">=", input), where("brandname", "<=", input + "\uf8ff"));
        const querySnapshot = await getDocs(q);
        const options = [];
        querySnapshot.forEach((doc) => {
          const brand = doc.data().brandname;
          if (!options.includes(brand)) {
            options.push(brand);
          }
        });
        setDropdownOptions(options);
      } else {
        setDropdownOptions([]);
      }
    };
  
    const handleOptionClick = (option) => {
      setSearchTerm(option);
      setDropdownOptions([]);
      navigate.push(`/search?brandname=${option}`);
    };
  
    return (
      <div className="home">
        <h1 style={{ position: "absolute", top: "150px", left: "500px", fontSize: "185px" }}>DUPE.</h1>
        <video autoPlay loop muted id="video">
          <source src={Video} type="video/mp4" />
        </video>
        <div className="overlay"></div>
        <div className="content">
          <form className="formback" onSubmit={handleSearch}>
            <div className="mainsearch">
              <input
                type="text"
                placeholder="Search Brand Name Items"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <button type="submit">Search</button>
            </div>
            <div className="dropdown">
              {dropdownOptions.length > 0 && (
                <ul>
                  {dropdownOptions.map((option) => (
                    <li key={option} onClick={() => handleOptionClick(option)}>
                      <a href="/search" style={{ color: "black" }}>
                        {option}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            </form>
            </div>
            <div className="search">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                   
        <div className="main">
        <div className="background" style={{position:"absolute", left: "50%", top:"80px"}}>
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
            ))}
        </div>
        </div>
    );
}

export default Home;

            
  
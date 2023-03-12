import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import "firebase/firestore";
import "./NavbarStyles.css";
const productsRef = collection(db, "products");


function Navbar() {
  // Set up state variables
  const [isNavVisible] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setSearchTerm(option);
    setDropdownOptions([]);
    navigate(`/details/${option.id}`);
  };

  useEffect(() => {
    userData();
  }, []);

  const userData = async () => {
    const q = query(collection(db, "products"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setDetails(data);
  };

  // Handle search click event
  const handleSearchClick = () => setShowSearch(true);

  // Handle search input event
  const handleSearchInput = async (event) => {
    const input = event.target.value;
    setSearchTerm(input);
    if (input.length > 0) {
        const q = query(productsRef, where("brandname", ">=", input), where("brandname", "<=", input + "\uf8ff"));
        const querySnapshot = await getDocs(q);
        const options = [];
        querySnapshot.forEach((doc) => {
          const product = doc.data();
          if (!options.includes(product.brandname)) {
            options.push({
              label: product.brandname,
              id: doc.id,
            })
          }
        });
        setDropdownOptions(options);
      } else {
        setDropdownOptions([]);
      }
    };

  return (
    <div
      className={isNavVisible ? "navbar navbar-bg" : "navbar"}
      style={{ backgroundColor: "rgba(0, 0, 0, .75)" }}
    >
      <div className={isNavVisible ? "logo dark" : "logo"}>
        <h2>DUPE.</h2>
      </div>
      <ul className="nav-menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/suggest">Suggest A Dupe</Link>
        </li>
        <li>
          <Link to="/search">Browse</Link>
        </li>
      </ul>
      <div className="nav-icons">
        {showSearch ? (
          <form>
            <input
                type="text"
                placeholder="Search..."
                onChange={handleSearchInput}
                value={searchResults.name}
             />
        <div className="dropdown">
            {dropdownOptions.length > 0 && (
              <ul>
              {dropdownOptions.map((option) => (
                <li key={option.id} onClick={() => handleOptionClick(option)}>
                    {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
          </form>
        ) : (
          <button className="corner" onClick={handleSearchClick}>
            <BiSearch className="icon" style={{ marginRight: "1rem" }} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
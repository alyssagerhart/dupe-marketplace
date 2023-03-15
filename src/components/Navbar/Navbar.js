import React, { useState } from "react";
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
  const [searchResults] = useState([]);
  const [, setSearchTerm] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [, setDetails] = useState([]);
  const navigate = useNavigate();

  // Handle option click event so if they click on the suggestion
  // it will take them to the details page
  const handleOptionClick = (option) => {
    setSearchTerm(option);
    setDropdownOptions([]);
    navigate(`/details/${option.id}`);
  };

 //use the useEffect hook to call the userData function
  useEffect(() => {
    userData();
  }, []);

  // Get the data from the database and put it into a object called userData
  const userData = async () => {
    const q = query(collection(db, "products"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setDetails(data);
  };

    //function to handle the search by brandname by using the searchTerm
    // variable and the dropdownOptions variable to render a suggestion
    // list when the user types in the search bar then filter the data
    // by the searchTerm variable and set the products variable to the
    // filtered data and then render the data to the page
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
      <ul className="nav-menu"style={{position:"absolute", left:"500px"}}>
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
          <form style={{position:"absolute", right:"10px", top:"20px", width:"200px"}}>
            <input
                type="text"
                placeholder="Search..."
                onChange={handleSearchInput}
                value={searchResults.name}
             />
        <div className="dropdown" style={{position:"absolute", right:"-2px", top:"81px", width:"200px"}}>
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
      </div>
    </div>
  );
}

export default Navbar;
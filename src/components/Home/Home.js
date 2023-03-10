import React, { useState } from 'react'
import './HomeStyles.css'
import { db } from '../../firebase/firebase'
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

import Video from '../../assets/shoppingtl.mp4'

const productsRef = collection(db, "products");

function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const navigate = useNavigate();

    const handleDropdownSelect = (selectedOption) => {
        setSearchTerm(selectedOption);
        navigate.push(`/search?brandname=${selectedOption}`);
    }

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
    }

    return (
        <div className='home'>
            <video autoPlay loop muted id='video'>
                <source src={Video} type='video/mp4' />
            </video>
            <div className="overlay"></div>
            <div className="content">
                <form className="formback" onSubmit={handleSearch}>
                    <div className="mainsearch">
                        <input type="text" placeholder='Search Dupes'
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)} />
                        <button type="submit">Search</button>
                    </div>
                    <div className="dropdown">
                        {dropdownOptions.length > 0 && (
                            <ul>
                                {dropdownOptions.map((option) => (
                                    <li key={option} onClick={() => handleDropdownSelect(option)}>
                                        {option}
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

export default Home

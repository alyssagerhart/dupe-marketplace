import React, {useState} from 'react'
import {BiSearch} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import './NavbarStyles.css'

function Navbar() {
    const [nav, setNav] = useState(false)
    // const handleNav = () => setNav(!nav)
    return (
        <div className={nav ? 'navbar navbar-bg' : 'navbar'} style={{backgroundColor: "(0, 0, 0, .75)"}}>
            <div className={nav ? 'logo dark' : 'logo'}>
                <h2>DUPE.</h2>
            </div>
            <ul className='nav-menu'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/suggest">Suggest A Dupe</Link></li>
                <li><Link to="/search">Browse</Link></li>
               </ul>
            <div className="nav-icons"> 
                <BiSearch className = 'icon' style={{marginRight: '1rem'}}/>
            </div>
        </div>
    )
}

export default Navbar;
import React, {useState} from 'react'
import {BiSearch} from 'react-icons/bi'
import {BsPerson} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import {HiOutlineMenuAlt4} from 'react-icons/hi'
import {AiOutlineClose} from 'react-icons/ai'
import './NavbarStyles.css'

function Navbar() {
    const [nav, setNav] = useState(false)
    const handleNav = () => setNav(!nav)
    return (
        <div className={nav ? 'navbar navbar-bg' : 'navbar'}>
            <div className={nav ? 'logo dark' : 'logo'}>
                <h2>DUPE.</h2>
            </div>
            <ul className='nav-menu'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/suggest">Suggest A Dupe</Link></li>
                <li><Link to="/search">Search By Category</Link></li>
               </ul>
            <div className="nav-icons"> 
                <BiSearch className = 'icon' style={{marginRight: '1rem'}}/>
                <BsPerson className = 'icon' />
            </div>
            <div className="hamburger" onClick={(handleNav)}>
                {!nav ? (<HiOutlineMenuAlt4 className ='icon'/>) : (<AiOutlineClose style={{color: '#000'}} className='icon' />)}
            
            </div>

        </div>
    )
}

export default Navbar;
import React from 'react'
import './HomeStyles.css'
import { AiOutlineSearch } from 'react-icons/ai'

import Video from '../../assets/shoppingtl.mp4'
function Home() {
    return (
        <div className= 'home'>
            <video autoPlay loop muted id='video'>
                <source src={Video} type='video/mp4' />
            </video>
            <div className="overlay"></div>
            <div className="content">
                <h1>DUPE</h1>
                <h2>the better choice</h2>
                <form className="form">
                    <div>
                        <input type="text" placeholder='Search Dupes'></input>
                    </div>
                    <div>
                        <button><AiOutlineSearch className='icon'/></button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Home

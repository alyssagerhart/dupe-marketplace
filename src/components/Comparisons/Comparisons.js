import React from 'react'
import './ComparisonsStyles.css'

import YesMoney from '../../assets/yes money.JPG'
import LuLu from '../../assets/lululemon.JPG'
import HeyNut from '../../assets/HeyNut.JPG'

function Comparisons() {
    return (
        <div className='comparisons'>
            <div className='container'>
                <h1>Make Informed Decisions On Every Day Purchases</h1>
                <div className="img-container">
                <img className='span-3 image-grid-row-2' src={YesMoney} alt="/"/>
                    <img src={LuLu} alt="/"/>
                    <img src={HeyNut} alt="/"/>
                </div>
            </div>
        </div>
    )
}

export default Comparisons

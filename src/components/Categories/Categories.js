import React from 'react'
import './CategoriesStyles.css'

import Leggings from '../../assets/leggings.webp'
import MakeUp from '../../assets/makeup.webp'
import Perfume from '../../assets/perfume.jpg'
import White from '../../assets/white.JPG'

function Comparisons() {
                  return (
                <div className='comparisons'>
                    <div className='container'>
                        <h1>Make Informed Decisions On Every Day Purchases</h1>
                        <div className="img-container">
                        <img src={White} alt="White"></img>
                        <a href="https://www.coolmathgames.com/" target="_blank" rel="noreferrer">
                            <img src={Leggings} alt="Leggings"></img>
                        </a>
                        <a href="https://www.coolmathgames.com/" target="_blank" rel="noreferrer">
                             <img src={MakeUp} alt="Make-Up"></img>
                             </a>
                        <a href="https://www.coolmathgames.com/" target="_blank" rel="noreferrer">
                            <img src={Perfume} alt="Perfume"></img>
                           </a>
                        </div>
                    </div>
                </div>
            )
        }

export default Comparisons
import React from 'react'
import Leggings from '../../assets/leggings.webp'
import MakeUp from '../../assets/makeup.webp'
import Perfume from '../../assets/perfume.jpg'



function Comparisons() {
                  return (
                <div className='comparisons'>
                    <div className='container'>
                        <h1>Choose from any of our Categories</h1>
                        <div className="img-container">
                        <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" width="0" height="0" alt="" />
                        <a href="./search" target="_blank" rel="noreferrer">
                            <img src={Leggings} alt="Leggings"></img>
                        </a>
                        <a href="./search" target="_blank" rel="noreferrer">
                             <img src={MakeUp} alt="Make-Up"></img>
                             </a>
                        <a href="./search" target="_blank" rel="noreferrer">
                            <img src={Perfume} alt="Perfume"></img>
                           </a>
                        </div>
                    </div>
                </div>
            )
        }

export default Comparisons
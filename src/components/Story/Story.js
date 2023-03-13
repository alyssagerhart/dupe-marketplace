import React from 'react'


import Logo from '../../assets/dupe logo.JPG'

function Story() {
    return (
        <div name='book' className='story'>
            <div className="container" style={{position:"absolute", left:"200px", top:"1150px"}}>
                <div className="left">
                    <h2>Our Story</h2>
                    <p>This "Dupe Project" is a way to make trends and expensive products more accessible. Within this project you could search for a item or even just a name brand and see "dupes" AKA similar items that are cheaper yet maintain the highest quality. Users will be able to add their own comments and suggestions to dupes they have tried. In addition to the suggestion itself it will also link to where users could buy the item. Even with the prices of everything going up, consumerism isn't going away, this program will recommend great alternatives that won't break the bank.</p>
                </div>
                    <div className="right">
                        <div className="promo">
                            <img src={Logo} alt="/" style={{ marginRight: '1rem' }} />
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Story
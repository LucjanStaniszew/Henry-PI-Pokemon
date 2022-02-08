import React from 'react';
import '../Styles/Card.css'

export default function Card ({ image, name, type}) {
    return (
        <div className='Card'>
            <h3>{name}</h3>
            <h5>{type}</h5>
            <img src={image} alt="PokeImage not found" width="150px" height="250px" />
        </div>
    )
}
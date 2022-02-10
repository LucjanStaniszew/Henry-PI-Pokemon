import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Card.css'

export default function Card ({ id, img, name, types}) {
    return (
        <div className='Card'>
            <div className='Card2'>
                <h2>Pokemon: {name}</h2>
                <Link to={"/detail/" + id}>
                    <img src={img} alt="PokeImage not found" width="250px" height="250px" />
                </Link>
                <h3>Types: {types.map(pt => "- " + pt.name + " ")}</h3>
                <br />
            </div>
        </div>
    )
}
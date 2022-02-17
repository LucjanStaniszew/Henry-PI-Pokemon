import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Card.css'

export default function Card ({ id, img, name, types}) {
    return (
        <div className='Card'>
            <h4 className='pokemon'>Pokemon: {name}</h4>
            <Link to={"/pokemons/" + id}>
                <img className='pokeImg' src={img} alt="PokeImage not found" width="175px" height="160px" />
            </Link>
            <h5 className='types'>Types: {types.map(pt => "- " + pt.name + " ")}</h5>
            <br />
        </div>
    )
}
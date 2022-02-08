import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPokes } from '../../Actions';
import {Link} from 'react-router-dom';
import Card from './Card'
import '../Styles/Home.css'

export default function Home(){
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons)

    useEffect (()=> {
        dispatch(getPokes())
    },[])

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokes())
    }

    return (
        <div className='mainContainer'>
            <Link to = '/pokemons'>Crear Poke</Link>
            <h1>Pokemon App</h1>
            <button onClick={e => {handleClick(e)}}>Recargar Pokemons</button>
            <div>
                <select>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                <select>
                    <option value="Todos">Filtrar...</option>
                    <option value="Tipos">Tipes</option>
                </select>
                <select>
                    <option value="Todos">Filtrar...</option>
                    <option value="Api">Existentes</option>
                    <option value="Created">Creados</option>
                </select>
                {
                    allPokemons && allPokemons.map( p => {
                        return(
                        <Card name={p.name} image={p.image} type={p.type} />
                    )})
                }
            </div>
        </div>
    )
} 
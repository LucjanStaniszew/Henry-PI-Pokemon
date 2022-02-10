import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPokes } from '../../Actions';
import {Link} from 'react-router-dom';
import Card from './Card'
import Paginado from './Paginado';
import '../Styles/Home.css'

export default function Home(){
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons)
    // Local States \\
    const [current, setCurrent] = useState(1)
    const [pokemonsPage, setPokemonsPage] = useState(12)
    const lastPoke = current * pokemonsPage
    const firstPoke = lastPoke - pokemonsPage
    const actualPokemons = allPokemons.slice(firstPoke, lastPoke)
    // Paginado \\
    const paginado = (pageNumber) => {
        setCurrent(pageNumber)
    }




    useEffect (()=> {
        dispatch(getPokes())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokes())
    }

    return (
        <div className='mainContainer'>
            <div className='sb'>
                <div className='Row'>
                    <h4 className='text'>Create:
                    <Link to = '/pokemons'>
                        <button className='create' />
                    </Link>
                    </h4>
                    <h4 className='text'>Reload: 
                    <button className='reload' onClick={e => {handleClick(e)}}/>
                    </h4>
                    <div className='filters'>
                        <select className='filters'>
                            <option value="asc">Ascendente</option>
                            <option value="desc">Descendente</option>
                        </select>
                        <select className='filters'>
                            <option value="Todos">Filtrar...</option>
                            <option value="Tipos">Tipes</option>
                        </select>
                        <select className='filters'>
                            <option value="Todos">Filtrar...</option>
                            <option value="Api">Existentes</option>
                            <option value="Created">Creados</option>
                        </select>
                    </div>
                </div>
                <div className='T-P-SB'>
                    {/*<SearchBar />*/}
                    <h1 className='Title'>Pokemon App</h1>
                    <Paginado className="paginado" pokemonsPage = {pokemonsPage} allPokemons = {allPokemons.length} paginado = {paginado} />
                </div>
            </div>
            <div className='Cards'>
                {
                    actualPokemons?.map( p => {
                        return(
                        <Card name={p.name} img={p.img} types={p.types} />
                    )})
                }
            </div>
        </div>
    )
} 
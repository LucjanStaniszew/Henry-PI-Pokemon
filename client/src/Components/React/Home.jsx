import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPokes, getTypes, getOnePoke, filterByType, filterByStrength } from '../../Actions';
import {Link} from 'react-router-dom';
import Card from './Card'
import Paginado from './Paginado';
import SearchBar from './SearchBar'
import '../Styles/Home.css'

export default function Home(){

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons)
    const allTypes = useSelector((state) => state.pokemonsTypes)
            // Local States \\
    const [current, setCurrent] = useState(1)
    const [pokemonsPage, setPokemonsPage] = useState(12)
    const lastPoke = current * pokemonsPage
    const firstPoke = lastPoke - pokemonsPage
    const pokemons = allPokemons.slice(firstPoke, lastPoke)
            // Pages \\
    const paginado = (pageNumber) => {
        setCurrent(pageNumber)
    }

            // Filters \\

    useEffect ( () => {
        dispatch(getTypes())
    }, [dispatch] )

    useEffect ( () => {
        dispatch(getPokes())
    },[dispatch] )
    
    function handleReload(e){
        e.preventDefault();
        dispatch(getPokes())
    }
    function handleFilterAbc(e){
        e.preventDefault();
        dispatch();
    }
    function handleFilterType(e){
        e.preventDefault();
        dispatch(filterByType(e.target.value))
    }

    function handleFilterStrength(e){
        e.preventDefault();
        dispatch();
    }

    function handleFilterApi(e){
        e.preventDefault();
        dispatch()
    }
    

    return (
        <div className='mainContainer'>

            <div className='sb'>
                <SearchBar className="searchBar" />
                <Link to="/home">
                    <h1 className='title'>Pokemon App</h1>
                </Link>
                <h4 className='text'>
                    <Link to = '/pokemons'>
                        <button className='create' />
                    </Link>
                </h4>
                <h4 className='text'>
                    <button className='reload' onClick={e => {handleReload(e)}}/>
                </h4>
            </div>

            <div className='left'>
                <Paginado className="paginado" pokemonsPage = {pokemonsPage} allPokemons = {allPokemons.length} paginado = {paginado} />
                <br />
                <div className='filters'>
                    <select className='filterAbc'>
                        <option value="all">Alphabetical Filter...</option>
                        <option value="asc">A to Z</option>
                        <option value="desc">Z to A</option>
                    </select>
                    <br/>
                    <select className='filterType' onChange={e => handleFilterType(e)}>
                        <option value="all">Type Filter...</option>
                        {
                            allTypes?.map( pt => {
                                return <option value={pt.name} key={pt.id}>{pt.name}</option>
                            })
                        }
                    </select>
                    <br/>
                    <select className='filterStrength'>
                        <option value="all">Strength Filter...</option>
                        <option value="powerfull">Powerfull</option>
                        <option value="weak">Weak</option>
                    </select>
                    <br/>
                    <select className='filterApi'>
                        <option value="all">Existent or Created Filter...</option>
                        <option value="api">Existent</option>
                        <option value="created">Created</option>
                    </select>
                </div>
            </div>

            <div className='cardscards'>
                { 
                    pokemons?.map( p => {
                        return(
                        <Card name={p.name} img={p.img} types={p.types} />
                    )})
                }
            </div>

        </div>
    )
} 
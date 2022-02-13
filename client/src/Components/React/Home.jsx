import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPokes, getTypes, reload, orderByAbc, filterByType, orderByStrength, filterApi } from '../../Actions';
import {Link} from 'react-router-dom';
import Card from './Card'
import Paginado from './Paginado';
import SearchBar from './SearchBar'
import loading from "../../PokeImagenes/loading.gif"
import '../Styles/Home.css'

export default function Home(){

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons)
    const allTypes = useSelector((state) => state.pokemonsTypes)
            // Local States \\
    const [current, setCurrent] = useState(1)
    const [pokemonsPage, setPokemonsPage] = useState(12)
    const [order, setOrder] = useState("")
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
    }, [dispatch] )
    
    function handleReload(e){
        e.preventDefault();
        dispatch(reload(e))
    }
    function handleOrderByAbc(e){
        e.preventDefault();
        dispatch(orderByAbc(e.target.value));
        setCurrent(1);
        setOrder(`Ordenado ${e.target.value}`)
    }
    function handleFilterType(e){
        e.preventDefault();
        dispatch(filterByType(e.target.value))
    }

    function handleOrderByStrength(e){
        e.preventDefault();
        dispatch(orderByStrength(e.target.value));
        setCurrent(1);
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleFilterApi(e){
        dispatch(filterApi(e.target.value))
    }
    

    return (
        <div className='mainContainer'>

            <div className='sb'>
                <SearchBar/>
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
                    <select className='filterAbc' onChange={e => handleOrderByAbc(e)}>
                        <option value="all">Alphabetical Order...</option>
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
                    <select className='filterStrength' onChange={e => handleOrderByStrength(e)}>
                        <option value="all">Strength Order...</option>
                        <option value="powerfull">Powerfull</option>
                        <option value="weak">Weak</option>
                    </select>
                    <br/>
                    <select className='filterApi' onChange={e => handleFilterApi(e)}>
                        <option value="pokes">Existent or Created Filter...</option>
                        <option value="api">Existent</option>
                        <option value="db">Created</option>
                    </select>
                </div>
            </div>

            <div className='cardscards'>
                { 
                    pokemons.length > 0 ? pokemons.map( p => {
                        return(
                        <Card name={p.name} img={p.img} types={p.types} />
                    )}) : 
                    <div>
                        <p className='loading'>Loading Pokemons...</p>
                        <img src={loading} alt="loading.gif" width="700px" height="250px" />
                    </div>
                    
                }
                {/*
                { 
                    pokemons?.map( p => {
                        return(
                        <Card name={p.name} img={p.img} types={p.types} />
                    )})
                }
                */}
            </div>

        </div>
    )
} 
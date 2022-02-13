import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPoke } from '../../Actions'
import '../Styles/SearchBar.css'

export default function Search() {
    const dispatch = useDispatch();
    const [ name, setName ] = useState("")

    const handleSearchBar = (e) => {
        setName(e.target.value)
        console.log(name)
    }

    const handleSubmit = (e) => {
        //e.prevent.default()
        dispatch(getPoke(name))
    }

    return (
        <div>
            <input className='searchInput' type='text' placeholder='Search Pokemons...' onChange={(e) => handleSearchBar(e)} />
            <button className='pokeSearch' type='submit' onClick={(e) => handleSubmit(e)} />
        </div>
    )
}
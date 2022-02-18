import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { postPoke, getTypes } from '../../Actions'
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar';
import '../Styles/PokemonCreate.css'

export default function PokeCreate(){
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const allTypes = useSelector((state) => state.pokemonsTypes)
    const [errors, setErrors] = useState({});

    const [ input, setInput ] = useState({
        name: "",
        hp: 50,
        attack: 50,
        defense: 50,
        speed: 50,
        height: 50,
        weight: 50,
        types: [],
        img: ""
    })

    function validation(input) {
        let errors = {};
        if(!input.name || typeof input.name !== "string") {   
            errors.name = "How should we call this Pokemon?";
        } else if (!input.hp || input.hp > 100 || input.hp < 0 || typeof input.hp !== "number") {
            errors.hp = "Please insert a valid HEALTH number from 0 to 100";
        } else if (!input.attack || input.attack > 100 || input.attack < 0 || typeof input.attack !== "number") {
            errors.attack = "Please insert a valid ATTACK number from 0 to 100";
        } else if (!input.defense || input.defense > 100 || input.defense < 0 || typeof input.defense !== "number") {
            errors.defense = "Please insert a valid DEFENSE number from 0 to 100";
        } else if (!input.speed || input.speed > 100 || input.speed < 0 || typeof input.speed !== "number") {
            errors.speed = "Please insert a valid SPEED number from 0 to 100";
        } else if (!input.height || input.height > 100 || input.height < 0 || typeof input.height !== "number") {
            errors.height = "Please insert a valid HEIGHT number from 0 to 100";
        } else if (!input.weight || input.weight > 100 || input.weight < 0 || typeof input.weight !== "number") {
            errors.weight = "Please insert a valid WEIGHT number from 0 to 100";
        } else if (!input.types) {
            errors.types = "Select from 1 to 3 types";
        } else if (!input.img || typeof input.img !== "string" ) {
            errors.img = "Invisibility power! Please insert a valid url image";
        }
        return errors;
    }

    useEffect ( () => {
        dispatch(getTypes())
    }, [dispatch] )

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validation({
            ...input,
            [e.target.name] : e.target.value
        }))
        console.log(input)
    }

    function handleSelect(e){
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }

    function handleSubmit(e){
        console.log(input)
        if(!input.name){
            e.preventDefault();
            return alert("Can't create a Pokemon without a name")
        } else if (!input.types.length) {
            e.preventDefault();
            return alert("Please select at least one pokemon type")
        } else if (!input.img) {
            e.preventDefault();
            return alert("Please send a valid url image")
        }
        dispatch(postPoke(input))
        alert("Pokemon created succesfully!!")
        setInput({
            name: "",
            hp: 50,
            attack: 50,
            defense: 50,
            speed: 50,
            height: 50,
            weight: 50,
            types: [],
            img: ""
        })
        navigate('/')
    }

    let handleDelete  = (type) => {
        setInput({
            ...input,
            types: input.types.filter( pt => pt !== type)
        })
    }

    return(
        <div className='divForm'>
            <NavBar/>
            <div className='title-submit'>
                <h2 className='createTitle'>Pokemon Creation:</h2>
                <h3 className='createTitle'>Create:
                <button id='submit' className='titleCreate' type='submit' onClick={(e) => handleSubmit(e)}/>
                </h3>
            </div>
                <form className='form' onSubmit={(e) => handleSubmit(e)}>
                    <div className='leftCreate'>
                        
                        <div className='range'>
                            <label className='textCreate'>HP:</label>
                            <input type="range" min="0" max="100" id='1' value={input.hp} name="hp" onChange={(e) => handleChange(e)} />
                            <h5 className='textCreate'>{input.hp}</h5>
                            {
                                errors.name && (
                                    <span className='errors'>{errors.hp}</span>
                                )
                            }
                        </div>
                        <br />
                        <div className='range'>
                            <label className='textCreate'>Attack:</label>
                            <input type="range" min="0" max="100" id='2' value={input.attack} name="attack" onChange={(e) => handleChange(e)} />
                            <h5 className='textCreate'>{input.attack}</h5>
                            {
                                errors.name && (
                                    <span className='errors'>{errors.attack}</span>
                                )
                            }
                        </div>
                        <br />
                        <div className='range'>
                            <label className='textCreate'>Defense:</label>
                            <input type="range" min="0" max="100" id='3' value={input.defense} name="defense" onChange={(e) => handleChange(e)} />
                            <h5 className='textCreate'>{input.defense}</h5>
                            {
                                errors.name && (
                                    <span className='errors'>{errors.defense}</span>
                                )
                            }
                        </div>
                    </div>

                    <div className='center'>

                        <div className='range'>
                            <label className='textCreate'>Speed:</label>
                            <input type="range" min="0" max="100" id='4' value={input.speed} name="speed" onChange={(e) => handleChange(e)} />
                            <h5 className='textCreate'>{input.speed}</h5>
                            {
                                errors.name && (
                                    <span className='errors'>{errors.speed}</span>
                                )
                            }
                        </div>
                        <br />
                        <div className='range'>
                            <label className='textCreate'>Height:</label>
                            <input type="range" min="0" max="100" id='5' value={input.height} name="height" onChange={(e) => handleChange(e)} />
                            <h5 className='textCreate'>{input.height}</h5>
                            {
                                errors.name && (
                                    <span className='errors'>{errors.height}</span>
                                )
                            }
                        </div>
                        <br />
                        <div className='range'>
                            <label className='textCreate'>Weight:</label>
                            <input type="range" min="0" max="100" id='6' value={input.weight} name="weight" onChange={(e) => handleChange(e)} />
                            <h5 className='textCreate'>{input.weight}</h5>
                            {
                                errors.name && (
                                    <span className='errors'>{errors.weight}</span>
                                )
                            }
                        </div>
                    </div>
                    {/* ------------------------------------- */}
                    <div className='rightCreate'>
                            <div>
                                <label className='textCreate'>Name:</label>
                                <input type="text" id='7' value={input.name} name="name" placeholder='PokeName' onChange={(e) => handleChange(e)} />
                                {
                                errors.name && (
                                    <p className='errors'>{errors.name}</p>
                                )
                            }
                            </div>

                            <div>
                                <label className='textCreate'>Select Types:</label>
                                <select id='8' onChange={(e) => handleSelect(e)}>
                                    <option value="" hidden name="types">Select Types:</option>
                                    {
                                        allTypes?.map(pt => {
                                            return ( <option value={pt.name} key={pt.id}>{pt.name}</option> )
                                        })
                                    }
                                </select>
                                <ul>
                                    <li>
                                        {
                                            input.types.map( pt =>
                                                <div>
                                                    <h5 className='textCreate'>
                                                        { allTypes?.find( p => p.name === pt)?.name }
                                                    <button className='deleteType' onClick={() => handleDelete(pt)}>X</button>
                                                    </h5>
                                                </div>
                                                )
                                        }
                                    </li>
                                </ul>
                                {
                                errors.types && (
                                    <span className='errors'>{errors.types}</span>
                                )
                            }
                            </div>

                        <div>
                            <label className='textCreate'>Image:</label>
                            <input type="url" id='9' value={input.img} name="img" placeholder='Image Url...' onChange={(e) => handleChange(e)} />
                            {
                                errors.img && (
                                    <span className='errors'>{errors.img}</span>
                                )
                            }
                        </div>

                    </div>
                    
                </form>


            </div>
    )


}
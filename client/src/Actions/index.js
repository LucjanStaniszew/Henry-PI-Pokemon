import axios from 'axios';

export function getPokes(){
    return async (dispatch) => {
        var pokes = await axios.get('http://localhost:3001/pokemons')
        return dispatch({
            type: "GET_POKEMONS",
            payload: pokes.data
        })
    }
}

export function getPoke(payload) {
            return ({
                type: "GET_POKE",
                payload
            })
}

export function getTypes(){
    return async (dispatch) => {
        var types = await axios.get('http://localhost:3001/types')
        return dispatch({
            type: "GET_TYPES",
            payload: types.data
        })
    }
}

export function getDetails(id) {
    return async function (dispatch) {
        try {
            let poke = await axios.get(`http://localhost:3001/pokemons/${id}`)
            return dispatch({
                type: 'GET_DETAILS',
                payload: poke.data
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export function postPoke(payload) {
    return async function (dispatch) {
        const pokemonCreated = await axios.post("http://localhost:3001/pokemons", payload)
        return pokemonCreated
    }
}

export function reload(payload){
    return {
        type: 'RELOAD',
        payload
    }
}

                        // Filters

export function orderByAbc (payload) {
    return {
        type: "ORDER_BY_ABC",
        payload
    }
}

export function filterByType (payload) {
    console.log(payload)
    return {
        type: "FILTER_BY_TYPE",
        payload
    }
}

export function orderByStrength (payload) {
    return {
        type: "ORDER_BY_STRENGTH",
        payload
    }
}

export function filterApi (payload) {
    return {
        type: "FILTER_API",
        payload
    }
}
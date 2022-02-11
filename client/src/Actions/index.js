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

export function getTypes(){
    return async (dispatch) => {
        var types = await axios.get('http://localhost:3001/types')
        return dispatch({
            type: "GET_TYPES",
            payload: types.data
        })
    }
}

export function getOnePoke(name) {
    return async (dispatch) => {
        var poke = await axios.get('http://localhost:3001/pokemons?name=' + name)
        return dispatch({
            type: "GET_ONE_POKE",
            payload: poke.data
        })
    }
}

                        // Filters

export function filterByAbc (payload) {
    return {
        type: "FILTER_BY_ABC",
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

export function filterByStrength (payload) {
    return {
        type: "FILTER_BY_STRENGTH",
        payload
    }
}

export function filterByApi (payload) {
    return {
        type: "FILTER_BY_API",
        payload
    }
}
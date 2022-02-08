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

export function getOnePoke(name) {
    return async (dispatch) => {
        var poke = await axios.get('http://localhost:3001/pokemons?name=' + name)
        return dispatch({
            type: "GET_ONE_POKE",
            payload: poke.data
        })
    }
}
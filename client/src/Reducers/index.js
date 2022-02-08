
const initialState = {
    pokemon: {},
    pokemons: [],
    pokemonsFiltered: [],
    pokemonsTypes: []
}


function rootReducer(state = initialState, action) {
    switch(action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload
            }

            case 'GET_ONE_POKE':
                return {
                    ...state,
                    pokemon: action.payload
                }

     default:
        return state
    }
}

export default rootReducer
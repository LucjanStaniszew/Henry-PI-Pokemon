
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
                pokemons: action.payload,
                pokemonsFiltered: action.payload
            }

        case 'GET_ONE_POKE':
            return {
                ...state,
                pokemon: action.payload
            }

        case 'GET_TYPES':
            return {
                ...state,
                pokemonsTypes: action.payload
            }

        /*case 'FILTER_BY_ABC':
            if( action.payload === "all" ){
                return {
                    ...state,
                    pokemons: state.pokemons
                } else {
                    let orderPokes = action.payload
                }
            }
            const allPokes = state.pokemons;
            const pokeFilter = action.payload === "all" ? allPokes : allPokes.filter
            return {
                ...state,

            }*/
            
        case 'FILTER_BY_TYPE':
            const allPokes = state.pokemonsFiltered;
            const typeFiltered = action.payload === "all" ? allPokes :
                allPokes.filter( p => p.types.map( pt => pt.name ).includes( action.payload ))
            return{
                ...state,
                pokemons: typeFiltered

            }
        
        

     default:
        return state
    }
}

export default rootReducer
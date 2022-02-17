const initialState = {
    pokemon: [],
    pokemons: [], // Este es el arreglo que modifico en los filtros
    pokemonsFiltered: [], // Este es el arreglo que se mantiene sin cambios
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

        case 'GET_POKE':
            /*
            pseudoCodigo:
            tengo 2 estados: pokemons, pokemonsFiltered
            el estado pokemons es el que se modifica y el estado Filtered es el que se mantiene igual
            Yo quiero encontrar un pokemon dentro de los 40 pokemones que tengo en pokemonsFiltered

            */
            let fullPoke = state.pokemonsFiltered;
            let onePoke = fullPoke.filter(p => p.name === action.payload )
            let noPoke = fullPoke
            return {
                ...state,
                pokemons: onePoke.length ? onePoke : noPoke.concat(alert("There is no pokemon with that name. Let me show all the pokes:"))
            }

        case 'GET_TYPES':
            return {
                ...state,
                pokemonsTypes: action.payload
            }
        
        case 'GET_DETAILS':
            return {
                ...state,
                pokemon: action.payload
            }

        case 'RELOAD':
            return {
                ...state,
                pokemons: state.pokemonsFiltered
            }

        case 'ORDER_BY_ABC': // all, asc, desc
            let orderPokemons = action.payload === "asc" ? 
            state.pokemons.sort(function ( a, b ) {
                if (a.name > b.name) {
                    return 1
                }
                if (b.name > a.name) {
                    return -1
                }
                return 0
            }) :
            state.pokemons.sort(function ( a, b ) {
                if (a.name > b.name) {
                    return -1
                }
                if (b.name > a.name) {
                    return 1
                }
                return 0
            })
            return {
                ...state,
                pokemons: orderPokemons
            }
            
        case 'FILTER_BY_TYPE':
            const allPokes = state.pokemonsFiltered;
            const typeFiltered = action.payload === "all" ? allPokes :
            allPokes.filter( pt => pt.types.map( pt => pt.name ).includes( action.payload ))
            return{
                ...state,
                pokemons: typeFiltered
            }

        case 'ORDER_BY_STRENGTH': // all, powerfull, weak
            let pokemonStrength = action.payload === "weak" ?
            state.pokemons.sort( (a, z) => {
                if ( a.attack > z.attack ) {
                    return 1
                }
                if ( z.attack > a.attack ) {
                    return -1
                }
                return 0
            }) :
            state.pokemons.sort( (a, z) => {
                if ( a.attack > z.attack ) {
                    return -1
                }
                if ( z.attack > a.attack ) {
                    return 1
                }
                return 0
            })
            return {
                ...state,
                pokemons: pokemonStrength
            }
            
        case 'FILTER_API': // pokes, api, db
            let pokes = []
            if( action.payload === "pokes" ) {
                pokes = state.pokemonsFiltered
            } else if( action.payload === "db" ) {
                pokes = state.pokemonsFiltered.filter( p => p.createdInDb )
            } else if ( action.payload === "api" ) {
                pokes = state.pokemonsFiltered.filter( p => !p.createdInDb )
            }
            return{
                ...state,
                pokemons: pokes
            }

        case 'POST_POKE':
            return {
                ...state,
            }
        
        

     default:
        return state
    }
}

export default rootReducer
const axios = require('axios')
const { Router } = require('express');
const { Pokemon, Type } = require('../db')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

                       // Configurando los MiddleWares \\
                    // MiddleWare de busqueda de Pokemons \\

const getDB = async () => {
    return await Pokemon.findAll({
        include: Type,
    });
};

const getApi = async () => {

    try {
        let pokeSaver = [];
        const urlPoke = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=12') 
        let pokeData = urlPoke.data.results.map( p => axios.get(p.url))
        const urlPoke2 = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=12&limit=28')
        let pokeData2 = urlPoke2.data.results.map( p => axios.get(p.url))

        let allPokes = pokeData.concat(pokeData2)
        
        let pokeResults = await axios.all(allPokes).then( poke => {
            poke.map( p => {
                pokeSaver.push({
                    id: p.data.id,
                    name: p.data.name,
                    hp: p.data.stats[0].base_stat,
                    attack: p.data.stats[1].base_stat,
                    defense: p.data.stats[2].base_stat,
                    speed: p.data.stats[5].base_stat,
                    height: p.data.height,
                    weight: p.data.weight,
                    types: p.data.types.map( pt => pt.type),
                    img: p.data.sprites.other.home.front_default,
                    db: false
                })
            })
            return pokeSaver;
        })
        return pokeResults
    } catch (e) {
        console.log(e)
    }
};

const getPokes = async () => {
    const api = await getApi();
    const db = await getDB();
    const pokes = await db.concat(api)
    return pokes;
};

                    // MiddleWare de Busqueda por Id \\

const idSearchApi = async(id) => {
    try {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`) /* 2334.657MS to load 1 pokemon */
        const details = await poke.data;
        return {
            id: details.id,
            name: details.name,
            hp: details.stats[0].base_stat,
            attack: details.stats[1].base_stat,
            defense: details.stats[2].base_stat,
            speed: details.stats[5].base_stat,
            height: details.height,
            weight: details.weight,
            types: details.types.map(pt => pt.type),
            img: details.sprites.other.home.front_default,
        };
    } catch (e) {
        console.log(e);
    };
};

const idSearchDB = async (id) => {
    try {
        const poke = await Pokemon.findByPk(id, {
            include: {
                model: Type,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        });
        return poke;
    } catch {
        return undefined;
    };
};

const idSearch = async(id) => {
    const api = idSearchApi(id);
    const db = idSearchDB(id);

    const [ apiPoke, dbPoke ] = await axios.all([api, db])
    return apiPoke || dbPoke;
};

                    // Middleware de Types \\

const loadPokeTypes = async () => {
    // Ruta para traer los tipos de pokes https://pokeapi.co/api/v2/type
    try {
        const pokeTypes = [];

        await axios.get('https://pokeapi.co/api/v2/type').then(apiTypes => {
            apiTypes.data.results.map(pt => pokeTypes.push(pt.name))
        }).catch(e => console.log(e))

        const types = pokeTypes.map( async (pt) => {
            return await Type.findOrCreate({
                where: {
                    name: pt
                }
            }).catch(e => console.log(e))
        })

        const allPokeTypes = await Type.findAll();
        return allPokeTypes;

    } catch (err) {
        console.log(err)
    }
}

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', async (req, res) => {
    
    let {name} = req.query;
    
    try {
        if(name) {
            const allPokes = await nameSearch();
            const poke = allPokes.find(p => p.name === name);
            if(poke) return res.status(200).json(poke);
            return res.status(404).send("There is no pokemon with that name")
        } else {
            const allPokes = await getPokes();
            return res.status(200).json(allPokes)
        }
    } catch (e) {
        res.status(404).send(e)
    }
})

router.get('/types', async (req, res) => {
    try {
        let pokeType = await loadPokeTypes()
        res.status(200).json(pokeType)
    } catch (err) {
        res.status(400).send(err)
    }
});

router.get('/pokemons/:idPokemon', async (req, res) => {
    try {
        const id = req.params.idPokemon;
        const idDetails = await idSearch(id);
        if (!idDetails) {
            return res.status(404).send("There is no Pokemon with this id")
        }
        res.status(200).json(idDetails);
    } catch (err) {
        console.log(err)
    }
})

router.post('/pokemons', async (req, res) => {

    let {
        name, 
        hp, 
        attack, 
        defense, 
        speed, 
        height, 
        weight, 
        types, 
        img 
    } = req.body;

    try {
        let newPoke = await Pokemon.create({
            name: name.toLowerCase(),
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            img
        })
        
       let typesDb = await Type.findAll({
            where: { name: types }
        })
        newPoke.addType(typesDb)
        
        res.status(201).json(newPoke)
    } catch (e) {
        console.log(e)
        res.status(404).send(e)
    }
})

module.exports = router;
const { Router } = require("express");
const router = Router();

const { getPokes, idSearch, nameSearch } = require('../controllers/pokemons');
const { Pokemon, Type } = require('../db');

// Using "router.use('/pokemons')" on the index of routes i have already stablished this route

// Route GET to /pokemons/ to get all pokemons from pokeapi and return only necesary data

router.get('/', async (req, res) => {
    let {name} = req.query;
    try {
        if(!name) {
            const allPokes = await getPokes();
            res.status(200).json(allPokes)
        } else if(name) {
            const allPokes = await nameSearch();
            const poke = allPokes.find(p => p.name === name);
            if(poke) return res.status(200).json(poke);
            return res.status(404).send("There is no pokemon with that name")
        }
    } catch (err) {
        res.status(404).send(err)
    }
})
/*
router.get('/', async (req, res, next) => {
    try {
        let allPokes = await getPokes();
        res.status(200).json(allPokes)
    } catch (err) {
        next(err)
    }
});
*/
// Route GET to /pokemons/:idPokemon to get the detail of a specific pokemon, 
// must only get that pokemon info and bring that info from api and DB

router.get('/:idPokemon', async (req, res) => {
    try {
        const id = req.params.idPokemon;
        const idDetails = await idSearch(id);
        if (!idDetails) {
            return res.status(404).send("There is no Pokemon with this id")
        }
        res.status(200).json(idDetails);
    } catch (err) {
        next (err)
    }
})

// Route GET to /pokemons?name="..." to get the pokemon that matches EXACTLY 
// the name we gave, and show an error message if there is no pokemon
/*
router.get('/:name', async (req, res) => {
    try {
        const pokeName = req.params.name;
        const nameDetails = await nameSearch(pokeName);
        if (!nameDetails) {
            return res.status(404).send("There is no Pokemon with this name")
        }
        res.status(200).json(nameDetails);
    } catch (err) {
        next (err)
    }
})
*/
// Route POST to /pokemons to post a new pokemon using the passed on body 
// info from the controlled form and create a new pokemon on DB

router.post('/', async (req, res) => {
    let { name, 
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
        // Funciona
        let newPoke = await Pokemon.create({
            name: name.toLowerCase(),
            hp: hp,
            attack: attack,
            defense: defense,
            speed: speed,
            height: height,
            weight: weight,
            img: img
        })
        
        types.map(async pt =>
            await Type.findOne({
                where: {
                     name: pt
                    }
                }).then(pt => newPoke.addType(pt))),
        
        res.status(201).json(newPoke)
    } catch (err) {
        res.send(err)
    }
        /* // Tarda mucho y retorna un objeto vacio
        if (name) {
            const allPoke = await getPokes()
            const isPoke = allPoke.find(p => p.name === name)

            if(!isPoke) {
                let newPoke = await Pokemon.create({
                    name: name.toLowerCase(),
                    hp: hp,
                    attack: attack,
                    defense: defense,
                    speed: speed,
                    height: height,
                    weight: weight,
                    img: img
                })
                types.map( async pt => await Type.findOne({
                    where: {
                        name: pt
                    }
                }).then(pt => newPoke.addType(pt)))
                res.status(201).json(newPoke)
            } else {
                res.send("Already exists a Pokemon with that name")
            }
        } else {
            res.send("Please send a name on the form")
        }
    } catch (err) {
        res.send(err)
    }*/
})


module.exports = router
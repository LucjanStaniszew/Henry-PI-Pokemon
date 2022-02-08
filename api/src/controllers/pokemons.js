const { Pokemon, Type } = require("../db");
const axios = require('axios');
const e = require("express");

// Empezamos a crear los controladores \\

const getApi = async () => {
    try {
        let pokeSaver = [];
        const urlPoke = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40') 
        let pokeData = urlPoke.data.results.map( p => axios.get(p.url))
        
        let pokeResults = await axios.all(pokeData).then( poke => {
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
                    img: p.data.sprites.other.dream_world.front_default,
                    db: false
                })
            })
            return pokeSaver;
        })

        // console.log(pokeResults)
        return pokeResults
    } catch (e) {
        console.log(e)
    }
};

const getDB = async () => {
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    });
};

const getPokes = async () => {
    const api = await getApi();
    const db = await getDB();
    const pokes = api.concat(db)
    return pokes;
};

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
            types: details.types,
            img: details.img
        };
    } catch {
        return undefined;
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

const nameSearchApi = async(name) => {
    try {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`) /* 2334.657MS to load 1 pokemon */
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
            types: details.types,
            img: details.img
        };
    } catch {
        return undefined;
    };
};

const nameSearchDB = async (name) => {
    try {
        const poke = await Pokemon.findOne({
            where: {
                model: Pokemon,
                attributes: [name],
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

const nameSearch = async (name) => {
    const api = nameSearchApi(name);
    const db = nameSearchDB(name);

    const [ apiPoke, dbPoke ] = await axios.all([api, db])
    return apiPoke || dbPoke;
}

module.exports = {
    getApi,
    getDB,
    getPokes,
    idSearch,
    nameSearch
}
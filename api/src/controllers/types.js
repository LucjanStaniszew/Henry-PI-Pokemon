const { Type } = require('../db')
const axios = require('axios')

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

module.exports = {
    loadPokeTypes
}
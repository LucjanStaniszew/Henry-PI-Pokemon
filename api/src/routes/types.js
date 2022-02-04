const { Router } = require('express')
const router = Router()

const { Type } = require('../db')
const { loadPokeTypes } = require('../controllers/types')
// Route GET to /types to get al poketypes

router.get('/', async (req, res, next) => {
    try {
        let pokeType = /*await Type.findAll();*/ await loadPokeTypes()
        res.status(200).json(pokeType)
    } catch (err) {
        res.status(400).send(err)
    }
});


module.exports = router
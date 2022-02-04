const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const routePokemons = require("./pokemons")
const routeTypes = require("./types")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', routePokemons);
router.use('/types', routeTypes);

module.exports = router;
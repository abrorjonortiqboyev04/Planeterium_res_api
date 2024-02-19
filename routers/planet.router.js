const { Router } = require('express')
const { allPlanets, addPlanet, updatePlanet,
        deletePlanet, onePlanetOpen 
      } = require('../controllers/planet.controller')

const { private, isAdmin } = require('../middlewares/auth.middle')

const router = Router()


router.post('/add', private, isAdmin, addPlanet)
router.get('/all', private, allPlanets)
router.put('/:id', private, isAdmin, updatePlanet)
router.get('/:id', private, onePlanetOpen)
router.delete('/:id', private, isAdmin, deletePlanet)


module.exports = router
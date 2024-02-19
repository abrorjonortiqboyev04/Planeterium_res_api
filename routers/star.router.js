const { Router } = require('express')
const { allStars, addStar, updateStar, deleteStar, oneStarById } = require('../controllers/star.controllar')
const { private, isAdmin } = require('../middlewares/auth.middle')


const router  = Router()

router.get('/all', private, allStars)
router.post('/add', private, isAdmin, addStar)
router.put('/:id',private, isAdmin, updateStar)
router.delete('/delete/:id', private, isAdmin, deleteStar)
router.get('/:id', private, oneStarById)


module.exports = router

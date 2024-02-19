const { Router } = require('express')
const { userRegistration, userLogin, userProfile, userUpdate, updateUserPassword } = require('../controllers/auth.conteroller')
const { private } = require('../middlewares/auth.middle')

const router = Router()

router.post('/registr', userRegistration)
router.post('/login', userLogin)
router.get('/:id', private, userProfile)
router.put('/profile/:id', private, userUpdate)
router.put('/password/:id', private, updateUserPassword)


module.exports = router
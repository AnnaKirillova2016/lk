let express = require('express')
let router = express.Router()
let UserController = require('../../controllers/user.controller')
let Authorization = require('../../auth/authorization')


// Authorize each API with middleware and map to the Controller Functions
router.post('/registration', UserController.createUser)
router.post('/login/', UserController.loginUser)
router.get('/', Authorization, UserController.getUsers)
router.delete('/:id', Authorization, UserController.removeUser)

// Export the Router
module.exports = router;

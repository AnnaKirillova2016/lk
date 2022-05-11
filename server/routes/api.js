const express = require('express')

let router = express.Router()
let users = require('./api/user.route')
let odinC = require('./api/odinC.route')
router.use('/users', users)
router.use('/odinc', odinC)

module.exports = router

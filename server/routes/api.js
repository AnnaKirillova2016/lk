const express = require('express')

let router = express.Router()
let users = require('./api/user.route')
router.use('/users', users);

module.exports = router;

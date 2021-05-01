const jwt = require('jsonwebtoken')
const config = require('../config')

let authorization = function (req, res, next) {
    let token = req.headers['x-access-token']
    let msg = {auth: false, message: 'No token provided.'}
    if (!token) res.status(500).send(msg)
    jwt.verify(token, config.SECRET, function (err, decoded) {
        let msg = {auth: false, message: 'Failed to authenticate token.'}
        if (err) res.status(500).send(msg)
        next()
    });
}

module.exports = authorization

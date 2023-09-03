'use strict'

const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT, { expiresIn: '1d' })
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT)
}

module.exports = {
    generateToken,
    verifyToken
}
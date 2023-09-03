'use strict'

const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const auth = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        const decode = verifyToken(access_token)

        const user = await User.findByPk(decode.id)
        if (!user) throw {
            name: "AuthenticationError",
            message: "You must login first"
        }

        req.user = decode

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = auth
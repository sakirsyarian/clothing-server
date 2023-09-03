'use strict'

const errorHandler = (err, req, res, next) => {
    const statusCode = (code, message) => {
        return res.status(code).json(message)
    }

    if (err.name === 'SequelizeValidationError') {
        const msg = err.errors.map(el => el.message)
        return statusCode(400, { message: msg })
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        const msg = err.errors.map(el => el.message)
        return statusCode(400, { message: msg })
    }

    if (err.name === 'AuthenticationError') {
        return statusCode(401, { message: err.message })
    }

    if (err.name === 'JsonWebTokenError') {
        return statusCode(401, { message: 'Invalid token' })
    }

    if (err.name === 'TokenExpiredError') {
        return statusCode(401, { message: 'Invalid token' })
    }

    if (err.name === 'AuthorizationError') {
        return statusCode(403, { message: err.message })
    }

    if (err.name === 'NotFound') {
        return statusCode(404, { message: err.message })
    }

    return res.status(500).json(err)
    // return statusCode(500, { message: "Internal server error" })
}

module.exports = errorHandler
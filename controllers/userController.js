'use strict'

const { OAuth2Client } = require('google-auth-library');

const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt');

class UserController {
    static async userFindAll(req, res) {
        const user = await User.findAll()
        res.status(200).json(user)
    }

    static async userCreate(req, res, next) {
        try {
            let userRole = (req.url === '/customer/signup') ? 2 : 1
            const { email, password } = req.body

            const user = await User.create({ email, password, RoleId: userRole })

            res.status(201).json({
                status: "created",
                data: {
                    id: user.id,
                    email: user.email,
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async userFindOne(req, res, next) {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ where: { email } })
            if (!user) throw {
                name: "AuthenticationError",
                message: "Invalid email/ password"
            }

            const isValid = comparePassword(password, user.password)
            if (!isValid) throw {
                name: "AuthenticationError",
                message: "Invalid email/ password"
            }

            const access_token = generateToken({ id: user.id })

            res.status(200).json({
                status: "ok",
                access_token,
                data: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async googlefindOrCreate(req, res, next) {
        try {
            const { google_token } = req.headers

            const client = new OAuth2Client(process.env.G_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.G_CLIENT_ID,
            });
            const payload = ticket.getPayload();

            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    email: payload.email,
                    password: process.env.DEFAULT_PASSWORD,
                    RoleId: 2
                },
                hooks: false
            })

            const access_token = generateToken({ id: user.id })

            res.status(200).json({
                status: "ok",
                access_token,
                data: {
                    username: user.username,
                    email: user.email,
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController
'use strict'

const express = require('express')
const router = express.Router()

const UserController = require('../controllers/userController')

router.post('/register', UserController.userCreate)
router.post('/login', UserController.userFindOne)
router.post('/google', UserController.googlefindOrCreate)

// client for customer
router.post('/customer/signup', UserController.userCreate)
router.post('/customer/signin', UserController.userFindOne)

module.exports = router
'use strict'

const express = require('express')
const router = express.Router()

const MidtransController = require('../controllers/midtransController')

router.post('/', MidtransController.midtransCreateToken)

module.exports = router
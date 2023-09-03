'use strict'

const express = require('express')
const router = express.Router()

const userRoute = require('./userRoute')
const useProduct = require('./productRoute')
const useCategory = require('./categoryRoute')
const useHistory = require('./historyRoute')
const useMidtrans = require('./midtransRoute')

const auth = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.status(200).json('Hello World!')
})

router.use(userRoute)
router.use(auth) // authentication
router.use(useProduct)
router.use('/categories', useCategory)
router.use('/histories', useHistory)
router.use('/midtrans-token', useMidtrans)

module.exports = router
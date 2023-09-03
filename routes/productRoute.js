'use strict'

const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/productController')

router.get('/products', ProductController.productFindAll)
router.post('/products', ProductController.productCreate)
router.get('/products/:id', ProductController.productDetail)
router.put('/products/:id', ProductController.productUpdate)
router.patch('/products/:id', ProductController.productPatch)
router.delete('/products/:id', ProductController.productDestroy)

// client for customer
router.get('/customer/products', ProductController.customerProductFindAll)

module.exports = router
'use strict'

const express = require('express')
const router = express.Router()

const CategoryController = require('../controllers/categoryController')

router.get('/', CategoryController.categoryFindAll)
router.post('/', CategoryController.categoryCreate)
router.delete('/:id', CategoryController.categoryDestroy)

module.exports = router
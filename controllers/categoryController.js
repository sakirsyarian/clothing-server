'use strict'

const { Category } = require('../models')

class CategoryController {
    static async categoryFindAll(req, res, next) {
        try {
            const category = await Category.findAll()

            res.status(200).json({
                status: "ok",
                data: category
            })
        } catch (error) {
            next(error)
        }
    }

    static async categoryCreate(req, res, next) {
        try {
            const { name, image } = req.body
            const category = await Category.create({ name, image })

            res.status(201).json({
                status: "created",
                data: category
            })
        } catch (error) {
            next(error)
        }
    }

    static async categoryDestroy(req, res, next) {
        try {
            const { id } = req.params
            const category = await Category.destroy({ where: { id } })

            if (!category) throw {
                name: "NotFound",
                message: "Data not found"
            }

            res.status(200).json({
                status: "deleted",
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CategoryController
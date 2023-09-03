'use strict';

const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const dataProducts = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'))
      .map(product => {
        product.createdAt = new Date()
        product.updatedAt = new Date()

        return product
      })

    await queryInterface.bulkInsert('Products', dataProducts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};

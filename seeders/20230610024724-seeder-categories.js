'use strict';

const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const dataCategories = JSON.parse(fs.readFileSync('./data/categories.json', 'utf-8'))
      .map(category => {
        category.createdAt = new Date()
        category.updatedAt = new Date()

        return category
      })

    await queryInterface.bulkInsert('Categories', dataCategories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};

'use strict';

const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const dataRoles = JSON.parse(fs.readFileSync('./data/roles.json', 'utf-8'))
      .map(role => {
        role.createdAt = new Date()
        role.updatedAt = new Date()

        return role
      })

    await queryInterface.bulkInsert('Roles', dataRoles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};

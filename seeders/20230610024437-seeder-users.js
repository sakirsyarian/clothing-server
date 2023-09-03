'use strict';

const fs = require('fs')
const { hashPassword } = require('../helpers/bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const dataUsers = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'))
      .map(user => {
        user.password = hashPassword(user.password)
        user.createdAt = new Date()
        user.updatedAt = new Date()

        return user
      })

    await queryInterface.bulkInsert('Users', dataUsers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

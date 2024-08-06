'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        firstName: 'Peter',
        lastName: 'Parker',
        username: 'Demo-lition',
        email: 'demo@user2.io',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        firstName: 'Demo',
        lastName: 'User',
        username: 'Demo-user',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        firstName: 'Ryder',
        lastName: 'Thompson',
        username: 'RyderThunder',
        email: 'ryder.thompson@gmail.com',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        firstName: 'Skylar',
        lastName: 'Bennett',
        username: 'SkyHigh',
        email: 'skylar.bennett@gmail.com',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        firstName: 'Mave',
        lastName: 'Harrison',
        username: 'MavTheBrave',
        email: 'm.harrison@gmail.com',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        firstName: 'Carter',
        lastName: 'Brooklyn',
        username: 'BrookStar',
        email: 'b.carter@gmail.com',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        firstName: 'Jaxon',
        lastName: 'Davis',
        username: 'JaxAttack',
        email: 'jaxon.davis@gmail.com',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        firstName: 'Harper',
        lastName: 'Mitchell',
        username: 'HarperHeart',
        email: 'harper.mitchell@gmail.com',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        firstName: 'Zane',
        lastName: 'Parker',
        username: 'ZaneZone',
        email: 'zane.parker@gmail.com',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        firstName: 'Addison',
        lastName: 'Roberts',
        username: 'AddieRocks',
        email: 'addison.roberts@gmail.com',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        firstName: 'Chase',
        lastName: 'Anderson',
        username: 'ChaseAce',
        email: 'chase.anderson@gmail.com',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        firstName: 'Quinn',
        lastName: 'Morgan',
        username: 'QuinnQuest',
        email: 'quinn.morgan@gmail.com',
        hashedPassword: bcrypt.hashSync('password'),
      },
    ], { validate: true })
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: {
        [Op.in]: ['Demo-lition',
          'Demo-user',
          'RyderThunder',
          'SkyHigh',
          'MavTheBrave',
          'BrookStar',
          'JaxAttack',
          'HarperHeart',
          'ZaneZone',
          'AddieRocks',
          'ChaseAce',
          'QuinnQuest']
      }
    }, {})
  }
};

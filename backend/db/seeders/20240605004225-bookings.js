'use strict';

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

const { Booking } = require('../models')

const bookings = [
  {
    // id: 1,
    spotId: 1,
    userId: 3,
    startDate: '2024-07-01',
    endDate: '2024-07-07'
  },
  {
    // id: 2,
    spotId: 2,
    userId: 3,
    startDate: '2024-08-15',
    endDate: '2024-08-20'
  },
  {
    // id: 3,
    spotId: 3,
    userId: 2,
    startDate: '2024-09-10',
    endDate: '2024-09-15'
  },
  {
    // id: 4,
    spotId: 5,
    userId: 1,
    startDate: new Date('2024-10-05'),
    endDate: new Date('2024-10-10')
  },
  {
    // id: 5,
    spotId: 4,
    userId: 2,
    startDate: new Date('2024-11-12'),
    endDate: new Date('2024-11-18')
  }
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate(bookings, { validate: true })
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    const { Op } = require('sequelize')
    await queryInterface.bulkDelete(options, null, {});

  }
};

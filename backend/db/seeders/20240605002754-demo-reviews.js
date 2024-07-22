'use strict';

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

const { Review } = require('../models')

const reviews = [
  {
    // id: 1,
    spotId: 1,
    userId: 2,
    review: 'Amazing place, very clean and well-located.',
    stars: 5
  },
  {
    // id: 2,
    spotId: 2,
    userId: 3,
    review: 'Great stay, host was very accommodating.',
    stars: 4
  },
  {
    // id: 3,
    spotId: 3,
    userId: 2,
    review: 'Decent place but a bit noisy at night.',
    stars: 3
  },
  {
    // id: 4,
    spotId: 4,
    userId: 1,
    review: 'Beautiful house, enjoyed our stay very much.',
    stars: 5
  },
  {
    // id: 5,
    spotId: 5,
    userId: 1,
    review: 'Good value for money, would stay again.',
    stars: 4
  },
  {
    // id: 6,
    spotId: 1,
    userId: 2,
    review: 'The view was breathtaking but the host was not responsive. We had issues with the hot water and wifi.',
    stars: 2
  },
  {
    // id: 7,
    spotId: 2,
    userId: 3,
    review: 'Comfortable and cozy, but could use better soundproofing.',
    stars: 4
  },
  {
    // id: 8,
    spotId: 3,
    userId: 2,
    review: 'A pleasant stay overall, though the WiFi was a bit spotty.',
    stars: 3
  },
  {
    // id: 9,
    spotId: 4,
    userId: 1,
    review: 'Spacious and modern, perfect for a family vacation.',
    stars: 4
  },
  {
    // id: 10,
    spotId: 5,
    userId: 1,
    review: 'Affordable and clean, with a friendly host.',
    stars: 4
  }
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate(reviews, { validate: true })
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    const { Op } = require('sequelize')
    await queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }
    }, {});
  }
};

'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

const { ReviewImage } = require('../models');

const reviewsImages = [
  {
    // id: 1,
    reviewId: 1,
    url: 'https://drive.google.com/file/d/123RJF7yuzS4l8llhbJ6JH4Y7xqL4D1Nw/view?usp=drive_link'
  },
  {
    // id: 2,
    reviewId: 3,
    url: 'https://drive.google.com/file/d/1sa6ZzLChz8ss6o4sdVE-Y92Z2kwMCzQM/view?usp=drive_link'
  },
  {
    // id: 3,
    reviewId: 3,
    url: 'https://drive.google.com/file/d/1kXZjTXRxzX2JdzonkzAGEWn8wc6TnsHE/view?usp=drive_link'
  },
  {
    // id: 4,
    reviewId: 4,
    url: 'https://drive.google.com/file/d/1kF2mk7ERhjt49Zn8p3L6iholwtGcxV8W/view?usp=drive_link'
  },
  {
    // id: 5,
    reviewId: 4,
    url: 'https://drive.google.com/file/d/1dFwdQHlOvHVOe27jBJcsV7lZd7tt6xw-/view?usp=drive_link'
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await ReviewImage.bulkCreate(reviewsImages, { validate: true })
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const { Op } = require('sequelize');
    await queryInterface.bulkDelete(options, {
      url: {
        [Op.in]: ['https://drive.google.com/file/d/123RJF7yuzS4l8llhbJ6JH4Y7xqL4D1Nw/view?usp=drive_link',
          'https://drive.google.com/file/d/1sa6ZzLChz8ss6o4sdVE-Y92Z2kwMCzQM/view?usp=drive_link',
          'https://drive.google.com/file/d/1kXZjTXRxzX2JdzonkzAGEWn8wc6TnsHE/view?usp=drive_link',
          'https://drive.google.com/file/d/1kF2mk7ERhjt49Zn8p3L6iholwtGcxV8W/view?usp=drive_link',
          'https://drive.google.com/file/d/1dFwdQHlOvHVOe27jBJcsV7lZd7tt6xw-/view?usp=drive_link'
        ]
      }
    }, {});
  }
};

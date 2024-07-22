'use strict';

const { Spot } = require('../models')

const spots = [
  {
    // id: 1,
    ownerId: 1,
    address: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    country: 'USA',
    lat: 37.7749,
    lng: -122.4194,
    name: 'Cozy Apartment in SF',
    description: 'A cozy and modern apartment in the heart of San Francisco.',
    price: 150.00
  },
  {
    // id: 2,
    ownerId: 2,
    address: '456 Elm St',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    lat: 34.0522,
    lng: -118.2437,
    name: 'Luxury Condo in LA',
    description: 'A luxurious condo with a beautiful view of Los Angeles.',
    price: 250.00
  },
  {
    // id: 3,
    ownerId: 3,
    address: '789 Maple Ave',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    lat: 40.7128,
    lng: -74.0060,
    name: 'Modern Loft in NYC',
    description: 'A modern loft in the vibrant city of New York.',
    price: 300.00
  },
  {
    // id: 4,
    ownerId: 1,
    address: '101 Pine St',
    city: 'Seattle',
    state: 'WA',
    country: 'USA',
    lat: 47.6062,
    lng: -122.3321,
    name: 'Charming House in Seattle',
    description: 'A charming house located in the beautiful city of Seattle.',
    price: 200.00
  },
  {
    // id: 5,
    ownerId: 2,
    address: '202 Oak St',
    city: 'Austin',
    state: 'TX',
    country: 'USA',
    lat: 30.2672,
    lng: -97.7431,
    name: 'Spacious Villa in Austin',
    description: 'A spacious villa with a pool in Austin, Texas.',
    price: 180.00
  }
];

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(spots, { validate: true })
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots'
    const { Op } = require('sequelize')
    await queryInterface.bulkDelete(options, {
      address: {
        [Op.in]: [
          '123 Main St',
          '456 Elm St',
          '789 Maple Ave',
          '101 Pine St',
          '202 Oak St'
        ]
      }
    }, {});
  }
};

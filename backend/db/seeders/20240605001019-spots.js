'use strict';

const { Spot } = require('../models')

const spots = [
  {
    ownerId: 1,
    address: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    country: 'USA',
    lat: 37.7749,
    lng: -122.4194,
    name: 'Walk to the Beach from this Ocean Front Home',
    description: 'Entire home in Moss Beach, California',
    price: 150.00
  },
  {
    ownerId: 2,
    address: '456 Elm St',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    lat: 34.0522,
    lng: -118.2437,
    name: 'Gem by the sea none-obstructive ocean view',
    description: 'A luxurious home with a beautiful view of Los Angeles.',
    price: 250.00
  },
  {
    ownerId: 3,
    address: '789 Maple Ave',
    city: 'Felton',
    state: 'CA',
    country: 'USA',
    lat: 40.7128,
    lng: -74.0060,
    name: "Whiskey Hollow A-Frame: As feat'd in Condé Nast!",
    description: 'Entire cabin in Felton, California',
    price: 300.00
  },
  {
    ownerId: 1,
    address: '101 Pine St',
    city: 'Seattle',
    state: 'WA',
    country: 'USA',
    lat: 47.6062,
    lng: -122.3321,
    name: 'The Malibu Dream Resort',
    description: 'Entire villa in Malibu, California',
    price: 1254.00
  },
  {
    ownerId: 2,
    address: '202 Oak St',
    city: 'Beverly Hills',
    state: 'CA',
    country: 'USA',
    lat: 30.2672,
    lng: -97.7431,
    name: 'Chateau de Laurel',
    description: 'Entire villa in Beverly Hills, California',
    price: 2480.00
  },
  {
    ownerId: 3,
    address: '202 Hollywood Hills Drive',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    lat: 30.2672,
    lng: -97.7431,
    name: 'Luxurious 6-BR Villa: Pool, and Stunning Views',
    description: 'Entire villa in Los Angeles, California',
    price: 1345.00
  },
  {
    ownerId: 3,
    address: '62209 Verbena Rd',
    city: 'Joshua Tree',
    state: 'CA',
    country: 'USA',
    lat: 30.2672,
    lng: -97.7431,
    name: 'Invisible House Joshua Tree | Modern Masterpiece',
    description: 'Entire home in Joshua Tree, California',
    price: 3945.00
  },
  {
    ownerId: 5,
    address: '62209 Verbena Rd',
    city: 'Lake Tahoe',
    state: 'CA',
    country: 'USA',
    lat: 30.2672,
    lng: -97.7431,
    name: 'Lakefront house with private beach',
    description: 'Stunning lake house in Tahoe',
    price: 845.00
  },
  {
    ownerId: 5,
    address: '62209 Verbena Rd',
    city: 'Stateline',
    state: 'NV',
    country: 'USA',
    lat: 30.2672,
    lng: -97.7431,
    name: 'Huge Ski In/Out with Best Heavenly Views',
    description: 'Entire home in Stateline, Nevada',
    price: 1145.00
  },
  {
    ownerId: 8,
    address: '62209 Verbena Rd',
    city: 'Clackmannanshihre',
    state: 'North Carolina',
    country: 'USA',
    lat: 30.2672,
    lng: -97.7431,
    name: 'Clakmanshire Castle | Luxury 3 bed rental',
    description: 'The Tower apartment at the unique & historic Dollarbeg Castle',
    price: 2145.00
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

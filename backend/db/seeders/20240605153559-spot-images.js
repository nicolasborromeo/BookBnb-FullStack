'use strict';


const { SpotImage } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

const spotImages = [
  {
    // id: 1,
    spotId: 1,
    url: 'https://drive.google.com/file/d/15dAa19f6cFrFKPS5r2Q19Knjxy9vODLF/view?usp=sharing',
    preview: true
  },
  {
    // id: 2,
    spotId: 2,
    url: 'https://drive.google.com/file/d/1iBh44ExwBHLbC3gMMWrRaQ10-iVSRDdZ/view?usp=sharing',
    preview: true
  },
  {
    // id: 3,
    spotId: 3,
    url: 'https://drive.google.com/file/d/1HXrRxQUs73m_TJkBh9rBdgjhtlHTvonL/view?usp=sharing',
    preview: true
  },
  {
    // id: 4,
    spotId: 4,
    url: 'https://drive.google.com/file/d/1qJGgdsCBKD1HwH7PUnjevUxRWpDZpirK/view?usp=sharing',
    preview: true
  },
  {
    // id: 5,
    spotId: 5,
    url: 'https://drive.google.com/file/d/1mIx4ayCu2TcMl6P3QfVJEn3pMNLE4rRM/view?usp=sharing',
    preview: true
  },
  {
    // id: 6,
    spotId: 4,
    url: 'https://drive.google.com/file/d/1jpzQxFg0Da9JQiO2aN3qyOGQ1I9tMChW/view?usp=sharing',
    preview: false
  },


]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(spotImages, { validate: true })
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages'

    const { Op } = require('sequelize')
    await queryInterface.bulkDelete(options, {
      url: {
        [Op.in]: [
          'https://drive.google.com/file/d/15dAa19f6cFrFKPS5r2Q19Knjxy9vODLF/view?usp=sharing',
          'https://drive.google.com/file/d/1iBh44ExwBHLbC3gMMWrRaQ10-iVSRDdZ/view?usp=sharing',
          'https://drive.google.com/file/d/1HXrRxQUs73m_TJkBh9rBdgjhtlHTvonL/view?usp=sharing',
          'https://drive.google.com/file/d/1qJGgdsCBKD1HwH7PUnjevUxRWpDZpirK/view?usp=sharing',
          'https://drive.google.com/file/d/1mIx4ayCu2TcMl6P3QfVJEn3pMNLE4rRM/view?usp=sharing',
          'https://drive.google.com/file/d/1jpzQxFg0Da9JQiO2aN3qyOGQ1I9tMChW/view?usp=sharing'
        ]
      }
    }, {});
  }
};

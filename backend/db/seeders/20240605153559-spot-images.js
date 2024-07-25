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
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939618/h1ph4_gbb2t8.webp',
    preview: true
  },
  {
    // id: 1,
    spotId: 1,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939617/h1ph5_mn7lfc.webp',
    preview: false
  },
  {
    // id: 1,
    spotId: 1,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939617/h1ph5_mn7lfc.webp',
    preview: false
  },
  {
    // id: 1,
    spotId: 1,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939615/h1ph3_mqwuky.webp',
    preview: false
  },
  {
    // id: 1,
    spotId: 1,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939614/h1ph1_zosazd.webp',
    preview: false
  },
  {
    // id: 2,
    spotId: 2,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939609/h2ph1_abdeqv.webp',
    preview: true
  },
  {
    // id: 2,
    spotId: 2,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939613/h2ph2_v97g7c.webp',
    preview: false
  },
  {
    // id: 2,
    spotId: 2,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939613/h2ph2_v97g7c.webp',
    preview: false
  },
  {
    // id: 2,
    spotId: 2,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939611/h2ph4_bolu2r.webp',
    preview: false
  },
  {
    // id: 2,
    spotId: 2,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939611/h2ph5_v9qmxh.webp',
    preview: false
  },
  {
    // id: 3,
    spotId: 3,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939608/h3ph1_etjzd2.webp',
    preview: true
  },
  {
    // id: 3,
    spotId: 3,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939609/h3ph2_fkhu9g.webp',
    preview: false
  },
  {
    // id: 3,
    spotId: 3,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939607/h3ph3_eyfcia.webp',
    preview: false
  },
  {
    // id: 3,
    spotId: 3,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939606/h3ph5_zui7zs.webp',
    preview: false
  },
  {
    // id: 3,
    spotId: 3,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939605/h3ph4_udzjgh.webp',
    preview: false
  },
  {
    // id: 4,
    spotId: 4,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939603/h4ph1_p862qz.webp',
    preview: true
  },
  {
    // id: 4,
    spotId: 4,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939602/h4ph2_tn97oj.webp',
    preview: false
  },
  {
    // id: 4,
    spotId: 4,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939604/h4ph3_yw6otp.webp',
    preview: false
  },
  {
    // id: 4,
    spotId: 4,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939601/h4ph4_ixvdnx.webp',
    preview: false
  },
  {
    // id: 4,
    spotId: 4,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939600/h4ph5_cykt28.webp',
    preview: false
  },
  {
    // id: 5,
    spotId: 5,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939599/h5ph1_ljgpo1.webp',
    preview: true
  },
  {
    // id: 5,
    spotId: 5,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939598/h5ph2_drwt5g.webp',
    preview: false
  },
  {
    // id: 5,
    spotId: 5,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939598/h5ph3_bsiq61.webp',
    preview: false
  },
  {
    // id: 5,
    spotId: 5,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939596/h5ph4_yfqdzy.webp',
    preview: false
  },
  {
    // id: 5,
    spotId: 5,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939596/h5ph5_etgfig.webp',
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

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
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939615/h1ph3_mqwuky.webp',
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
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939616/h1ph2_ohthpe.webp',
    preview: false
  },
  {
    // id: 1,
    spotId: 1,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939618/h1ph4_gbb2t8.webp',
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
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939613/h2ph3_u6a2uk.webp',
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
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722894375/h4ph1_ygdn5s.webp',
    preview: true
  },
  {
    // id: 4,
    spotId: 4,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722894373/h4ph2_ldrlse.webp',
    preview: false
  },
  {
    // id: 4,
    spotId: 4,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722894374/h4ph3_ybrrkx.webp',
    preview: false
  },
  {
    // id: 4,
    spotId: 4,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722894374/h4ph4_zol9fy.webp',
    preview: false
  },
  {
    // id: 4,
    spotId: 4,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722894373/h4ph5_wy9sms.webp',
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
  {
    // id: 5,
    spotId: 6,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722895087/h7ph4_y9nrak.webp',
    preview: true
  },
  {
    // id: 5,
    spotId: 6,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722895090/h7ph2_q4a7oy.webp',
    preview: false
  },
  {
    // id: 5,
    spotId: 6,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722895088/h7ph3_obz1k4.webp',
    preview: false
  },
  {
    // id: 5,
    spotId: 6,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722895092/h7ph1_mpmwhe.webp',
    preview: false
  },
  {
    // id: 5,
    spotId: 6,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722895086/h7ph5_igouow.webp',
    preview: false
  },
  ////
  {
    spotId: 7,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722895842/ph1_w1dxdd.webp',
    preview: true
  },
  {
    spotId: 7,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722895838/phh2_aowrto.webp',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722895835/ph3_il9duz.webp',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722895836/ph4_aidoo5.webp',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722895840/ph5_k593q2.webp',
    preview: false
  },
  /////
  {
    spotId: 8,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722464098/h8ph1_t6rpr9.webp',
    preview: true
  },
  {
    spotId: 8,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722464098/h8ph2_opwv96.webp',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722464098/h8ph3_k79yxi.webp',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722464098/h8ph4_nlaycw.webp',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722464098/h8ph5_ym6ez7.webp',
    preview: false
  },
  ///
  {
    spotId: 9,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939595/h6ph1_bk8qua.webp',
    preview: true
  },
  {
    spotId: 9,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939592/h6ph2_ejp3de.webp',
    preview: false
  },
  {
    spotId: 9,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939591/h6ph3_ievp8z.webp',
    preview: false
  },
  {
    spotId: 9,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939593/h6ph4_u8mngb.webp',
    preview: false
  },
  {
    spotId: 9,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1721939594/h6ph5_rujawn.webp',
    preview: false
  },
  ///
  {
    spotId: 10,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722894875/h10ph1_vuh5cg.webp',
    preview: true
  },
  {
    spotId: 10,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722894872/h10ph2_ddwazn.webp',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722894872/h10ph2_ddwazn.webp',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722894871/h10ph4_jj4vr6.webp',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://res.cloudinary.com/dklsvbe1v/image/upload/v1722894869/h10ph5_tvoflf.webp',
    preview: false
  },
  ///


]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(spotImages, { validate: true })
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages'

    const { Op } = require('sequelize')
    await queryInterface.bulkDelete(options, {}, {});
  }
};

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
    review: 'Fantastic Location, right next to Route 1, make it super easy to start a road trip. Beautiful back yard, incredible views, quiet neighborhood',
    stars: 4,
    createdAt: '2021-02-14 15:01:53'
  },
  {
    // id: 1,
    spotId: 1,
    userId: 3,
    review: 'Fantastic location with beach access. It was so peaceful we can’t wait to go back. We also loved the video instructions of how to get to the house as it can be a little tricky.',
    stars: 5,
    createdAt: '2022-06-11 11:27:13'
  },
  {
    // id: 1,
    spotId: 1,
    userId: 4,
    review: 'We had a great time at this home! We were surprised at how nice the private cove was, especially to explore at low tide, since the listing didn’t highlight this feature. A gem!',
    stars: 5,
    createdAt: '2021-02-16 01:51:17'
  },
  {
    // id: 1,
    spotId: 1,
    userId: 5,
    review: 'We enjoyed our stay! The place is spacious and comfortable. Bonus was having what felt like your own piece of the Pacific. Would stay again!',
    stars: 4,
    createdAt: '2023-06-07 20:52:01'
  },
  {
    // id: 1,
    spotId: 1,
    userId: 6,
    review: 'This place was our favorite place in the area that we have stayed! Relaxing and perfect for a quick getaway! We will be back for sure!',
    stars: 5,
    createdAt: '2021-01-08 12:55:51'
  },
  {
    // id: 1,
    spotId: 1,
    userId: 9,
    review: 'Gorgeous views of the ocean, hot tub was great, location was ideal. Some things needed some TLC (lights flickering in the bathroom, not all heaters worked). Peter was very communicative throughout.',
    stars: 4,
    createdAt: '2023-10-04 12:51:10'
  },
  {
    // id: 1,
    spotId: 1,
    userId: 6,
    review: 'This place was our favorite place in the area that we have stayed! Relaxing and perfect for a quick getaway! We will be back for sure!',
    stars: 5,
    createdAt: '2021-08-21 11:44:31'
  },
  {
    // id: 2,
    spotId: 2,
    userId: 3,
    review: 'Amazing views of the Pacific. House clean. Couches not comfortable and carpets needed cleaned. Overall good place to stay close to the city and airport.',
    stars: 4,
    createdAt: '2023-02-26 10:11:24'
  },
  {
    // id: 2,
    spotId: 2,
    userId: 4,
    review: 'What a beautiful home! I feel so fortunate that we found this “gem” for our family vacation to the Bay Area. It served as the perfect home base as we visited SF and the nearby beaches. The view is absolutely unbeatable and worth the cost for that alone.',
    stars: 5,
    createdAt: '2022-05-02 07:30:11'
  },
  {
    // id: 2,
    spotId: 2,
    userId: 5,
    review: 'A house book should be created! I prefer not to have to speak with the owners. On say 2 she text me to remind me not to any parties. I wasn’t having a party. This trip was about pure relaxation.',
    stars: 2,
    createdAt: '2024-09-04 07:03:41'
  },
  {
    // id: 2,
    spotId: 2,
    userId: 6,
    review: 'One of the best AirBNB I’ve ever stayed at. The house was just as described in the description. We had everything we needed to make ourselves at home. The view from the house is AMAZING. ',
    stars: 4,
    createdAt: '2024-01-06 14:27:53'
  },
  {
    // id: 3,
    spotId: 3,
    userId: 2,
    review: 'What a great spot for a vacation. The home is nestled in the woods, and I enjoyed sitting on the back deck, just relaxing. The whole place was clean and everything was in working perfectly',
    stars: 5,
    createdAt: '2021-04-04 09:28:28'
  },
  {
    // id: 3,
    spotId: 3,
    userId: 4,
    review: 'Spent Birthday eve and already looking forward to visiting again, this is right out of dreams, loved all the little touches, all the aesthetic details!',
    stars: 5,
    createdAt: '2021-04-24 08:04:04'
  },
  {
    // id: 3,
    spotId: 3,
    userId: 5,
    review: 'My teenage daughter and I had a wonderful time in Whiskey Hollow. Waking up amongst the Redwood trees every morning was magical.',
    stars: 5,
    createdAt: '2023-07-12 12:46:44'
  },
  {
    // id: 3,
    spotId: 3,
    userId: 6,
    review: 'Wonderful spot for your family with a young toddler. There were many thoughtful touches!',
    stars: 5,
    createdAt: '2022-11-19 16:15:23'
  },
  {
    // id: 3,
    spotId: 3,
    userId: 7,
    review: 'What a wonderful place, nestled in the tall redwoods. Our family had an amazing stay!',
    stars: 5,
    createdAt: '2024-12-10 13:05:50'
  },
  {
    // id: 3,
    spotId: 3,
    userId: 8,
    review: 'I absolutely loved this place. They take pride in their home and everything is well marked, clean, and filled with love. A perfect spot for my retreat, so happy I found it! Hope to return.',
    stars: 4,
    createdAt: '2023-12-14 04:01:27'
  },
  {
    // id: 5,
    spotId: 4,
    userId: 3,
    review: 'We had a fantastic stay! Lior, the contact for the place, was responsive and helpful, and they were able to be flexible with what we needed, which we truly appreciated.',
    stars: 5,
    createdAt: '2021-02-19 20:00:23'
  },
  {
    // id: 5,
    spotId: 4,
    userId: 8,
    review: 'Amazing property. Breathtaking views. Everything was superb. Would definitely recommend this beautiful home to anyone considering it.',
    stars: 5,
    createdAt: '2021-07-13 20:54:33'
  },
  {
    // id: 5,
    spotId: 4,
    userId: 9,
    review: 'Expect epic sweeping, unspoiled views of the Malibu mountains and pacific coast. Private, lush setting with absolute deluxe accommodations. ',
    stars: 5,
    createdAt: '2023-05-15 20:46:06'
  },
  {
    // id: 5,
    spotId: 4,
    userId: 7,
    review: 'Such a great host and property. Communication was very precise.',
    stars: 4,
    createdAt: '2023-02-20 05:29:16'
  },
  {
    // id: 6
    spotId: 7,
    userId: 1,
    review: 'Host was very easy to communicate with and the home is absolutely gorgeous, pictures are accurate and reflective of the beautiful home.',
    stars: 5,
    createdAt: '2024-09-04 20:34:54'
  },
  {
    // id: 7
    spotId: 7,
    userId: 2,
    review: 'A beautiful house in great surroundings with stunning views that would need a few updates. Everything is nice and clean, except the ants in the house. The price was very fair for the location.',
    stars: 3,
    createdAt: '2023-01-10 13:04:12'
  },
  {
    // id: 7,
    spotId: 6,
    userId: 5,
    review: 'This place is AMAZING! The staff is excellent! They accommodated me with every request. They went above and beyond! This home will exceed your expectations! ',
    stars: 5,
    createdAt: '2024-11-12 05:48:23'
  },
  {
    // id: 7,
    spotId: 6,
    userId: 6,
    review: 'Pretty amazing in all honesty. The only down for us was the pool was just too cold to go in, which was a big reason we chose the location.',
    stars: 3,
    createdAt: '2022-05-14 12:02:01'
  },
  {
    // id: 7,
    spotId: 6,
    userId: 7,
    review: 'The invisible house is just a marvel of architecture & engineering. Simply an amazing experience! The location was private yet close enough to the park, could an entrance from inside the house. Thank you!',
    stars: 5,
    createdAt: '2021-11-08 11:57:34'
  },
  {
    // id: 9,
    spotId: 9,
    userId: 8,
    review: 'The space is huge and we loved the gigantic kitchen area for meals together. Good access to downtown South Lake Tahoe with a short drive.',
    stars: 5,
    createdAt: '2024-06-04 10:18:34'
  },
  {
    // id: 9,
    spotId: 9,
    userId: 6,
    review: 'Wonderful spot!! Quite a lot of stairs but otherwise spacious and great overall spot! Tons of parking too!!!',
    stars: 5,
    createdAt: '2021-05-25 01:45:30'
  },
  {
    // id: 9,
    spotId: 9,
    userId: 1,
    review: 'Enjoyed our stay with family in this home, very spacious there are a few things that need to be addressed but not a deal breaker. This is our 2nd visit and stay at this rental.',
    stars: 4,
    createdAt: '2024-12-23 11:50:54'
  },
  {
    // id: 10,
    spotId: 10,
    userId: 1,
    review: 'What a magical place to stay! We had a lovely time. The beds were comfortable, the views were stunning, the place was huge and there were thoughtful touches everywhere that made it feel luxurious.',
    stars: 5,
    createdAt: '2024-01-06 09:06:31'
  },
  {
    // id: 10,
    spotId: 10,
    userId: 2,
    review: 'We had a couple of issues, but overall our experience was incredible. Highly recommend!!',
    stars: 4,
    createdAt: '2022-11-12 04:36:13'
  },
  {
    // id: 10,
    spotId: 10,
    userId: 8,
    review: 'Absolutely magical fairytale location. Even better in person. We never wanted to leave.',
    stars: 5,
    createdAt: '2021-08-05 14:59:47'
  },
  {
    // id: 10,
    spotId: 10,
    userId: 5,
    review: 'We absolutely loved our stay! It was better than described. Gorgeous surroundings, wonderful accommodations.',
    stars: 5,
    createdAt: '2024-10-23 02:36:17'
  },

];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate(reviews, { validate: true })
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    const { Op } = require('sequelize')
    await queryInterface.bulkDelete(options, {}, {});
  }
};

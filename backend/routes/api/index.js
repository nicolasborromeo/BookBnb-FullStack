// setting API routers to hablde API requests. REST API server functionality

const router = require('express').Router();
const sessionRouter = require('./session.js')
const userRouter = require('./users.js')
const spotsRouter = require('./spots.js')
const reviewsRouter = require('./reviews.js')
const spotImagesRouter = require('./spotimages.js')
const reviewImagesRouter = require('./reviewimages.js')
const bookingsRouter = require('./bookings.js')

const { restoreUser } = require('../../utils/auth.js')

// GET /api/set-token-cookie
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });

router.use(restoreUser)

router.use('/session', sessionRouter)
router.use('/users', userRouter)
router.use('/spots', spotsRouter)
router.use('/reviews', reviewsRouter)
router.use('/spot-images', spotImagesRouter)
router.use('/review-images', reviewImagesRouter)
router.use('/bookings', bookingsRouter)

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});




module.exports = router

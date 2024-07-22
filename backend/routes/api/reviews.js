const router = require('express').Router();
const { User, SpotImage, Review, Spot, ReviewImage } = require('../../db/models')

const { restoreUser, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation')
const { check, body } = require('express-validator')


const _reviewExists = async (req, res, next) => {
    let review = await Review.findByPk(req.params.reviewId)
    if (!review) {
        let err = new Error();
        err.status = 404;
        err.message = "Review couldn't be found"
        return next(err)
    };
    return next()
}

const checkDuplicate = async (req, res, next) => {
    let review = await Review.findByPk(req.params.reviewId)
    if (review && (review.userId === req.user.id)) {
        let err = new Error();
        err.status = 500;
        err.message = "User already has a review for this spot"
        return next(err)
    }
}
const _maxImage = async (req, res, next) => {
    let reviewImages = await ReviewImage.findAll({
        where: { reviewId: req.params.reviewId }
    })
    if (reviewImages.length < 10) {
        return next()
    } else {
        let err = new Error()
        err.status = 403;
        err.message = "Maximum number of images for this resource was reached"
        return next(err)
    }
}
const _reviewIsUsers = async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const userId = req.user.id
    let review = await Review.findByPk(reviewId)
    if (review.userId !== userId) {
        let err = new Error()
        err.status = 403
        err.message = "Forbidden"
        return next(err)
    }
    return next()
}

const validateReview = [
    body('review')
        .exists()
        .notEmpty()
        .withMessage("Review text is required"),
    body('stars')
        .exists()
        .notEmpty()
        .isInt()
        .custom(value => {
            if (value < 1 || value > 5) {
                throw new Error()
            }
            return true
        })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]


router.put('/:reviewId',
    requireAuth,
    _reviewExists,
    _reviewIsUsers,
    validateReview,
    async (req, res, next) => {

        const reviewId = req.params.reviewId
        const { review, stars } = req.body;

        await Review.update(
            { review: review, stars: stars },
            { where: { id: reviewId } },
        );

        let updatedReview = await Review.findByPk(reviewId)
        res.status(200).json(updatedReview)
    })




router.post('/:reviewId/images',
    requireAuth,
    _reviewExists,
    _reviewIsUsers,
    _maxImage,
    async (req, res, next) => {
        const reviewId = req.params.reviewId;
        const { url } = req.body

        let newImage = await ReviewImage.create({ reviewId, url })
        let imageRes = newImage.toJSON()
        delete imageRes.createdAt
        delete imageRes.updatedAt
        delete imageRes.reviewId
        return res.status(201).json(imageRes)
    })

router.get('/current', requireAuth, async (req, res, next) => {
    let userId = req.user.id

    userReviews = await Review.findAll({
        where: { userId: userId },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: { exclude: ['spotId', 'description', 'createdAt', 'updatedAt'] },
                include: { model: SpotImage }
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })
    let reviewList = []
    userReviews.forEach(el => {
        reviewList.push(el.toJSON())
    });

    reviewList.forEach(review => {
        // console.log(review.Spot)
        review.Spot.SpotImages.forEach(img => {
            if (img.preview === true) review.Spot.previewImg = img.url
        })
        delete review.Spot.SpotImages
    })


    res.status(200).json({ Reviews: reviewList })
})


router.delete('/:reviewId',
    requireAuth,
    _reviewExists,
    _reviewIsUsers,
    async (req, res, next) => {

        let review = await Review.findByPk(req.params.reviewId)
        if (!review) {
            let err = new Error();
            err.status = 404;
            err.message = "Review couldn't be found"
            return next(err)
        };

        await Review.destroy({
            where: { id: req.params.reviewId }
        })
        res.status(200).json({message: "Successfully deleted"})
    })

    router.get('/', async (req, res, next)=> {
        let reviews = await Review.findAll({})
        res.json(reviews)
    })




module.exports = router

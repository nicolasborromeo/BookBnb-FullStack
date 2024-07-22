const router = require('express').Router();

const { ReviewImage, Review }= require('../../db/models')
const { requireAuth, restoreUser } = require('../../utils/auth')

router.delete('/:imageId', restoreUser, requireAuth, async (req, res, next)=> {
    const userId = req.user.id
    const imageId = req.params.imageId

    const reviewImage = await ReviewImage.findByPk(imageId)
    if(!reviewImage) {
        let err = new Error('Not Found');
        err.status = 404;
        err.message = ("Review Image couldn't be found")
        return next(err)
    }
    const reviewId = reviewImage.reviewId
    let review = await Review.findByPk(reviewId)

    if (userId !== review.userId) {
        let err = new Error()
        err.status = 403
        err.message = "Forbidden"
        return next(err)
    }

    await ReviewImage.destroy({where: {id:imageId}})

    res.status(200).json({ message: "Successfully deleted" })

})

module.exports = router

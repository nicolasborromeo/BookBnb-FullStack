const router = require('express').Router();
const { SpotImage, Spot }= require('../../db/models')
const { requireAuth, restoreUser, _properAuth, spotImage404 } = require('../../utils/auth')

router.delete('/:imageId', restoreUser, requireAuth, async (req, res, next) => {
    const userId = req.user.id
    const imageId = req.params.imageId

    const spotImage = await SpotImage.findByPk(imageId)
    if(!spotImage) {
        let err = new Error('Not Found');
        err.status = 404;
        err.message = ("Spot Image couldn't be found")
        return next(err)
    }
    const spotId = spotImage.spotId
    let spot = await Spot.findByPk(spotId)


    if (userId !== spot.ownerId) {
        let err = new Error()
        err.status = 403
        err.message = "Forbidden"
        return next(err)
    }

    await SpotImage.destroy({where: {id:imageId}})

    res.status(200).json({ message: "Successfully deleted" })
})

module.exports = router

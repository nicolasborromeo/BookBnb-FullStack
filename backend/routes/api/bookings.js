const router = require('express').Router();

const { Spot, Booking, SpotImage } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation')
const { body } = require('express-validator')

router.get('/current', requireAuth, async (req, res, next) => {
    let userId = req.user.id

    let userBookings = await Booking.findAll({
        where: { userId: userId },
        include: [{
            model: Spot,
            attributes: { exclude: ['createdAt', 'updatedAt', 'description'] },
            include: {
                model: SpotImage
            }
        }]
    })
    let bookingList = []
    userBookings.forEach(booking => {
        bookingList.push(booking.toJSON())
    })

    bookingList.forEach(booking => {
        booking.Spot.SpotImages.forEach(spotImage => {
            if (spotImage.preview === true) {
                booking.Spot.previewImage = spotImage.url
            }
        })
        delete booking.Spot.SpotImages
    })

    res.status(200).json({ Bookings: bookingList })

});

const validateBooking = [
    body('startDate')
        .custom(val => {
            if (new Date(val) < new Date()) {
                throw new Error("startDate cannot be in the past");
            }
            return true
        }),
    body('endDate')
        .exists()
        .notEmpty()
        .custom((val, { req }) => {
            if (new Date(val) <= new Date(req.body.startDate)) {
                throw new Error("endDate cannot be on or before startDate");
            }
            return true;
        }),
    handleValidationErrors
]

router.put('/:bookingId', requireAuth, validateBooking, async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId);
    if (!booking) {
        let err = new Error('Not Found')
        err.status = 404
        err.message = "Booking couldn't be found"
        return next(err)
    };

    const userId = req.user.id
    if (booking.userId !== userId) {
        let err = new Error()
        err.status = 403
        err.message = "Forbidden"
        err.stack = null
        return next(err)
    };
    //DATES
    const today = new Date();
    const newStartDate = new Date(req.body.startDate);
    const newEndDate = new Date(req.body.endDate);

    if (today >= new Date(booking.endDate)) {
        let err = new Error()
        err.status = 403
        err.message = "Past bookings can't be modified"
        return next(err)
    };

    //booking conflict
    let spotBookings = await Booking.findAll({ where: { spotId: booking.spotId } });
    let errors = {};


    spotBookings.forEach(booking => {
        const bookingStartDate = new Date(booking.startDate);
        const bookingEndDate = new Date(booking.endDate);

        if (Number(booking.id) != Number(req.params.bookingId)) {
            if (newStartDate >= bookingStartDate && newStartDate <= bookingEndDate) {
                errors.startDate = "Start date conflicts with an existing booking";
            }

            if (newEndDate >= bookingStartDate && newEndDate <= bookingEndDate) {
                errors.endDate = "End date conflicts with an existing booking";
            }
            if (newStartDate >= bookingStartDate && newStartDate <= bookingEndDate && newEndDate > bookingEndDate) {
                errors.startDate = "Start date conflicts with an existing booking";
            }
            if (newEndDate >= bookingStartDate && newEndDate <= bookingEndDate && newStartDate < bookingStartDate) {
                errors.endDate = "End date conflicts with an existing booking";
            }
            if (newStartDate < bookingStartDate && newEndDate > bookingEndDate) {
                errors.startDate = "Start date conflicts with an existing booking";
                errors.endDate = "End date conflicts with an existing booking";
            }
        }
    });

    if (Object.keys(errors).length > 0) {
        let err = new Error('Booking conflict');
        err.status = 403;
        err.errors = errors;
        err.message = "Sorry, this spot is already booked for the specified dates";
        return next(err);
    };

    await Booking.update({
        startDate: newStartDate,
        endDate: newEndDate
    }, {
        where: {
            id: req.params.bookingId
        }
    });

    let response = await Booking.findByPk(req.params.bookingId);
    res.status(200).json(response)
});



router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    let booking = await Booking.findByPk(req.params.bookingId)
    if (!booking) {
        let err = new Error('Not Found')
        err.status = 404
        err.message = "Booking couldn't be found"
        return next(err)
    }
    let userSpot = await Spot.findOne({ where: { id: booking.spotId } })
    const userId = req.user.id
    if (booking.userId !== userId && userSpot.ownerId !== userId) {
        let err = new Error()
        err.status = 403
        err.message = "Forbidden"
        err.stack = null
        return next(err)
    }
    const today = new Date();
    const bookingStartDate = new Date(booking.startDate);
    if (today >= bookingStartDate) {
        let err = new Error()
        err.status = 403
        err.message = "Bookings that have been started can't be deleted"
        return next(err)
    };

    await Booking.destroy({ where: { id: req.params.bookingId } })


    res.status(200).json({ message: "Successfully deleted" })
})

module.exports = router

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../../db/models');
const { Op } = require('sequelize')
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation')
const { setTokenCookie, restoreUser } = require('../../utils/auth')


const validateLogin = [
    check('credential')
        .exists({checkFalsy: true})
        .notEmpty()
        .withMessage("Email or username is required"),
    check('password')
        .exists({checkfalse: true})
        .notEmpty()
        .withMessage( "Password is required"),
    handleValidationErrors
]



router.post('/', validateLogin, async (req, res, next) => {

    const { credential, password } = req.body;

    const user = await User.unscoped().findOne({
        where: {
            [Op.or]: [
                {username: credential},
                {email: credential}
            ]
        }
    });

    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        let error = new Error('Log In Failed');
        error.title = 'Login failed';
        error.message = 'Invalid Credentials'
        error.status = 401;
        error.errors = { credentials: 'The provided credentials were invalid.' }
        return next(error)
    };

    let safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username
    };

    setTokenCookie(res, safeUser);

    res.json({
        user: safeUser
    });
});


router.get('/', async (req, res, _next) => {
    if(!req.user) res.status(200).json({user: req.user})
    if(req.user) {
        let safeUser = {
            id: req.user.id,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
            username: req.user.username
        };
        res.status(200).json({user: safeUser})
    }
})


router.delete('/', async (_req, res) => {
    res.clearCookie('token')
    res.json({ message: 'Succesfully Loged Out' })
})


module.exports = router

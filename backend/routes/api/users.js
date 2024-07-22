const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const { check } = require('express-validator')
const { handleValidationErrors, userExists } = require('../../utils/validation')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage("Invalid email"),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage("Username is required"),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    // check('password')
    //   .exists({ checkFalsy: true })
    //   .isLength({ min: 6 })
    //   .withMessage('Password must be 6 characters or more.'),
    check('firstName')
      .exists()
      .notEmpty()
      .isLength({min: 2})
      .withMessage("First Name is required"),
    check('lastName')
      .exists()
      .notEmpty()
      .isLength({min: 2})
      .withMessage("Last Name is required"),
    handleValidationErrors
  ];


router.post(
    '/',
    userExists,
    validateSignup,
    async (req, res) => {

    const { username, email, password, firstName, lastName } = req.body;

    const hashedPassword = bcrypt.hashSync(password)
    const user = await User.create({
      firstName,
      lastName,
      email,
      username,
      hashedPassword,
    })

    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
    };

    setTokenCookie(res, safeUser);

    return res.status(201).json({
        user: safeUser
    })
});

router.get('/', async (req,res,next)=> {
  res.json(await User.findAll())
});


module.exports = router

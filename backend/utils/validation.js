const { validationResult } = require('express-validator') //import the validationResult function to analyze the request
// console.log('validationResult =======================================', validationResult)

const { User } = require('../db/models')
// const { use } = require('../routes/api/session')

const handleValidationErrors = (req, res, next) => {

    const validationErrors = validationResult(req) //use it here, passing in the request
    // console.log('validationErrors =======================================', validationErrors)

    if (!validationErrors.isEmpty()) { //if there are any errors, format and send them tothe next error handler
        const errors = {}
        validationErrors.array().forEach(error => {
            console.log(error)
            errors[error.path] = error.msg
        });
        const err = new Error('Bad request')
        err.errors = errors
        err.status = 400
        err.title = "Bad request"
        next(err)
    }
    next() //else continue
}

const userExists = async (req, res, next) => {
    const {email, username} = req.body
    const {Op} = require('sequelize')
    const errors = {}
    let activeEmail = await User.findOne({where: {email: email}});
    if(activeEmail) errors.email = "User with that email already exists"
    let activeUsername = await User.findOne({where: {username: username}});
    if(activeUsername) errors.username = "User with that username already exists"

    if(activeEmail || activeUsername) {
        let err = new Error
        err.status = 500
        err.message = 'User already exists'
        err.errors = errors
        return next(err)
    }

    return next()
}

module.exports = { handleValidationErrors, userExists} //export the functions

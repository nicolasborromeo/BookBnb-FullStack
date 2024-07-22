
// backend/utils/auth.js
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

//function to set  the a JWT cookie after the user is logged in or signed up.
//CREATES A TOKEN AND SETS IT AS A COOKIE IN THE RESPONSE OBJECT
const setTokenCookie = (res, user) => {
    //create the token
    // A new object containing only the essential user information that will be embedded in the JWT. This helps ensure that sensitive information is not included in the token.
    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
    };

    //SYNTAX: jwt.sign(payload, secretOrPrivateKey, [options, callback])
    const token = jwt.sign( //THIS METHOD CREATES THE JWT TOKEN
        { data: safeUser }, //this is the PAYLOAD (and because this is visibile it's important that no sensitive information like the hashedpassword is in here) -- the "data" key is not necesarry unless we want to add more info to the payload
        secret, //the secret key from the .env made to SIGN the TOKEN
        { expiresIn: parseInt(expiresIn) } //604,800 seconds = 1 week //An object specifying additional options for the token, such as its expiration time (expiresIn), the algorithm used for signing (algorithm), issuer (issuer), audience (audience), and more.
    );

    const isProduction = process.env.NODE_ENV === "production"; //returns a boolean

    //set the token cookie on the response
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, //maxage in milliseconds
        httpOnly: true, // set's it to http only. This is key //The cookie is not accessible via JavaScript (only accessible via HTTP requests), enhancing security by mitigating the risk of cross-site scripting (XSS) attacks.
        secure: isProduction,//the cookie will only be sent if the enviroment is in production
        sameSite: isProduction && "Lax" //Helps prevent cross-site request forgery (CSRF) attacks. The Lax setting allows the cookie to be sent with same-site requests and top-level navigation GET requests, but not with third-party requests.
    });

    return token;
};


//--------------------RESTORE USER--------------------------//
//middleware function to verify and parse the JWT's payload and search the DB for a User with the ID that comes in the payload

const restoreUser = (req, res, next) => {
    const { token } = req.cookies;
    req.user = null;
    //SYNTAX: jwt.verify(token, secretOrPublicKey, [options, callback])
    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }
        try {
            const { id } = jwtPayload.data;

            req.user = await User.findByPk(id, {
                attributes: {
                    include: ['firstName', 'lastName', 'email', 'username'] //'createdAt', 'updatedAt'
                }
            });
        } catch (e) {
            res.clearCookie('token');
            return next(e);
        }

        if (!req.user) res.clearCookie('token');

        return next();
    });
};



//------------REQUIRE AUTH------------------------------------//

//Middleware to require a user tu auhtenticate before accesing a route.
//if there is no current user, return an error
//it will conect directly to route handleres where there needs to be a current user logged in for the actions in those routes

const requireAuth = function (req, res, next) {
    if (req.user) return next();

    const err = new Error('Authentication required');
    err.title = 'Authentication required';
    err.errors = { message: 'Authentication required' };
    err.status = 401;
    err.stack = null
    return next(err)
}


const spotAuthentication = async (req, _res, next) => {
    const { Spot } = require('../db/models')
    //find the user id
    const userId = req.user.id
    //find spot's owner id
    let spot = await Spot.findByPk(req.params.spotId)
    //check for existing spot
    if (!spot) {
        let err = new Error()
        err.status = 404,
        err.message = "Spot couldn't be found"
        return next(err)
    }
    //compare
    if (req.user.id !== spot.ownerId) {
        let err = new Error()
        err.status = 403
        err.message = "Forbidden"
        err.stack = null
        return next(err)
    }
    // req.spotId = spot.id -- YOU CAN ADD THE SPOT TO THE REQ IF NEEDED
    return next()
}



// const _properAuth = (userId, spotId) => {
//     if (userId !== spotId) {
//         let err = new Error()
//         err.status = 403
//         err.message = "Forbidden"
//         return next(err)
//     }
// }

// const spotImage404 = () => {
//     let err = new Error('Not Found');
//     err.status = 404;
//     err.message = ("Spot Image couldn't be found")
//     return next(err)
// }

//exporting everything
module.exports = { setTokenCookie, restoreUser, requireAuth, spotAuthentication };

// const JwtStrategy = require('passport-jwt').Strategy,
//     ExtractJwt = require('passport-jwt').ExtractJwt,
//     User = require('../model/user');
// require('dotenv').config();

// var opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env.SECRET;
// const Strategy = new JwtStrategy(opts, function (jwt_payload, done) {
//     console.log(jwt_payload)
//     User.findOne({ id: jwt_payload.id }, function (err, user) {
//         if (err) {
//             return done(err, false);
//         }
//         if (user) {
//             req.user = decoded;
//             next();
//             // return done(null, user);
//         } else {
//             return done(null, false);
//             // or you could create a new account
//         }
//     });
// });


// module.exports = (passport) => {
//     passport.use(Strategy)
// }


const jwt = require('jsonwebtoken');
require('dotenv').config();

const verify = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err)
            return res.status(403).send({ auth: false, message: 'Failed to authenticate token.' })
        console.log(decoded)
        req.user = decoded;
        next()
    })
};



module.exports = {
    verify
}
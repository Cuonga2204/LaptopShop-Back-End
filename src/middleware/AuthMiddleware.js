const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const authUserMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    const userId = req.body.userId || req.query.userId;
    console.log(userId);

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The authemtication'
            })
        }
        console.log(user);

        const { payload } = user;
        if (payload.id === userId) {
            next();

        } else {
            return res.status(404).json({
                status: 'ERR',
                message: 'Not User'
            })
        }
    });
}

const authMiddleware = (req, res, next) => {
    // console.log('checkToken', req.headers.token.split(' ')[1]);
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, 'access_token', function (err, user) {
            // if (err instanceof jwt.JsonWebTokenError) {
            //     return res.status(401).json({
            //         status: 'ERR',
            //         message: 'token expired'
            //     })
            // }
            if (err) {
                return res.status(404).json({
                    status: 'ERR',
                    message: 'The authemtication'
                })
            }
            // console.log('user', user)
            const { payload } = user;
            if (payload.isAdmin) {
                next();

            } else {
                return res.status(404).json({
                    status: 'ERR',
                    message: 'Not Admin'
                })
            }
        });
    } catch (error) {
    }
}
module.exports = {
    authMiddleware,
    authUserMiddleware
}
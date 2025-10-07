const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const authUserMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const userId = req.body.id || req.params.id;

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The authentication'
            })
        }

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

const authAdminMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, 'access_token', function (err, user) {
            if (err instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({
                    status: 'ERR',
                    message: 'token expired'
                })
            }
            if (err) {
                return res.status(404).json({
                    status: 'ERR',
                    message: 'The authentication'
                })
            }
            const { payload } = user;
            if (payload.role === 'admin') {
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
    authAdminMiddleware,
    authUserMiddleware
}
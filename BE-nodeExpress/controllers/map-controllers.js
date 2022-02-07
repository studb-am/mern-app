const HttpError = require('../models/http-error');

const validateToken = (req, res, next) => {
   res.status(200).json({ 'message': 'authorized!'});
   //return next(new HttpError('unauthorized!', 401));
}

module.exports = {
    validateToken
}

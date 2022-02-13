const HttpError = require('../models/http-error');

//This function works with a get request (where params have been appended to the url)
const validateToken = (req, res, next) => {
	const token = req.query.access_token;
	if (token !== 'abc') {
		return next(new HttpError('unauthorized', 401));
	}
	
	res.status(200).json({ 'message': 'authorized!'});
}


module.exports = {
    validateToken
}

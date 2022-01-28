const jwt = require('jsonwebtoken');

const HttpError = require('./models/http-error');

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authentication?.split(' ')[1]; //convenzione vuole che il token sia del tipo 'Bearer <TOKEN>' per questo utilizziamo lo split e poi prendiamo il secondo elemento, ovvero il token
		if (!token) {
			throw new Error('Authentication failed');
		}
		const decodedToken = jwt.verify(token, 'my_secret_key');
		req.userData = { userId: decodedToken.userId  };
		next();
	} catch(err) {
		return next(new HttpError(err.message, 401));
	}
}

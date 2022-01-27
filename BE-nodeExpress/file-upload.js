const multer = require('multer');
const {v1: uuid} = require('uuid');

const fileUpload = multer({
	limits: 500000,
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, '../imgs')
		},
		filename: (req, file, cb) => {
			const ext = file.mimetype.split('/')[1];
			cb(null, uuid() + '.' + ext);
		}
	}),
	fileFilter: (req, file, cb) => {
		const isValid = !!file.mimetype.split('/')[1];
		let error = isValid ? null : new Error('Invalid mime type');
		cb(error, isValid);
	}
});

module.exports = fileUpload;

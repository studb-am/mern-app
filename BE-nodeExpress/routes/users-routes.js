const express = require('express');

const userControllers = require('../controllers/users-controllers');
const fileUpload = require('../file-upload');

const routes = express.Router();

routes.get('/', userControllers.getUsers);
routes.post('/signup',
	fileUpload.single('image'),
	userControllers.signUp
);
routes.post('/login', userControllers.login);

module.exports = routes;

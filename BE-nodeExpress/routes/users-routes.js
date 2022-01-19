const express = require('express');

const userControllers = require('../controllers/users-controllers');

const routes = express.Router();

routes.get('/', userControllers.getUsers);
routes.post('/signup', userControllers.signUp);
routes.post('/login', userControllers.login);

module.exports = routes;
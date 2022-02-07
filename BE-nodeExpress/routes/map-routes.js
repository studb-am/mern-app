const express = require('express');

const mapControllers = require('../controllers/map-controllers');

const routes = express.Router();

routes.get("/", mapControllers.validateToken);

module.exports = routes;
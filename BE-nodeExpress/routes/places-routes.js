const express = require('express');

const placeControllers = require('../controllers/places-controllers');
const fileUpload = require('../file-upload');

const routes = express.Router();

routes.get('/user/:userId', placeControllers.getPlacesByUserId);
routes.get('/place/:placeId', placeControllers.getPlaceByPlaceId);
routes.post('/',
	fileUpload.single('imageUrl'),
	placeControllers.createPlace
);
routes.patch('/place/:placeId', placeControllers.updatePlace);
routes.delete('/place/:placeId', placeControllers.deletePlace);

module.exports = routes;

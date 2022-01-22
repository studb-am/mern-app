const HttpError = require('../models/http-error');
const Place = require('../models/place');


const getPlacesByUserId = async (req, res, next) => {
    const { userId } = req.params;
    
    let places;
    try {
	places = await Place.find({creator: userId});
    } catch(err) {
	return next(new HttpError(err.message, 500));
    }

    if (!places.length) {
        next(new HttpError('Could not find a place for the provided user Id', 404));
        return;
    }

    res.status(200).json({ data: places.map(place => place.toObject({ getters: true })) });
}

const getPlaceByPlaceId = async (req, res, next) => {
    const { placeId } = req.params;
    
    let place;
    try {
	    place = await Place.findById(placeId);
    } catch(err) {
	return next(new HttpError(err.message, 500));
    }

    if (!place) {
        return next(new HttpError('Could not find a place for the provided Id', 404));
    }

    res.status(200).json({ data: place.toObject({ getters: true }) });
}

const createPlace = async (req, res, next) => {
    const { title, description, creator, imageUrl, coordinates } = req.body;
    
    const placeToCreate = new Place({
	    title,
	    description,
	    imageUrl,
	    location: coordinates,
	    creator
    });

    try {
	    await placeToCreate.save();
    } catch(err) {
	    return next(new HttpError(err.message, 500));
    }
    
    res.status(201).json({ placeCreated: placeToCreate });
}

const updatePlace = async (req, res, next) => {
    const { title, description } = req.body;
    const placeId = req.params.placeId;
   
    let placeToUpdate;
    try {
	placeToUpdate = await Place.findById(placeId);	
    } catch(err) {
	return next(new HttpError(err.message, 500));
    }

    placeToUpdate.title = title;
    placeToUpdate.description = description;

    try {
	await placeToUpdate.save();
    } catch(err) {
	return next(new HttpError(err.message, 500));
    }

    res.status(200).json({ updatedPlace: placeToUpdate.toObject({ getters: true }) });
}

const deletePlace = async (req, res, next) => {
    const placeId = req.params.placeId;

    let placeToDelete;
    try {
	placeToDelete = await Place.findById(placeId);
	await placeToDelete.remove();
    } catch(err) {
	return next(new HttpError(err.message, 500));
    }
    
    res.status(200).json({ message: `Place with id:${placeId} deleted!` });
}

module.exports = {
    getPlaceByPlaceId,
    getPlacesByUserId,
    createPlace,
    updatePlace,
    deletePlace
}

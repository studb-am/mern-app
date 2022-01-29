const mongoose = require('mongoose');
const fs = require('fs');

const HttpError = require('../models/http-error');
const Place = require('../models/place');
const User = require('../models/user');


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

    res.status(200).json({ places: places });
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

    res.status(200).json({ place: place.toObject({ getters: true }) });
}

const createPlaceNoImage = async (req, res, next) => {
    const { title, description, creator, coordinates } = req.body;

    const placeToCreate = new Place({
	    title,
	    description,
	    imageUrl: 'test_link',
	    location: coordinates,
	    creator
    });

   let user;
   try {
	user = await User.findById(creator);
   } catch(err) {
	return next(new HttpError(err.message, 500));
   }

   if (!user) {
	return next(new HttpError('Could not find the user provided. Please try again with a valid user!', 422));
   }

   //nota va capito come avviare il primary Mongo con le 2 repliche e settare la password
   try {
	const currSession = await mongoose.startSession();
	currSession.startTransaction();
	await placeToCreate.save({session: currSession});
	await user.places.push(placeToCreate);
	await user.save({session: currSession});
	await currSession.commitTransaction();
    } catch(err) {
	    return next(new HttpError(err.message, 500));
    }

    res.status(201).json({ placeCreated: placeToCreate });
}

const createPlace = async (req, res, next) => {
    const { title, description, creator, coordinates } = req.body;
   
    const placeToCreate = new Place({
	    title,
	    description,
	    imageUrl: req.file.path,
	    location: JSON.parse(coordinates),
	    creator
    });
   
   let user;
   try {
	user = await User.findById(creator);
   } catch(err) {
	return next(new HttpError(err.message, 500));
   }

   if (!user) {
	return next(new HttpError('Could not find the user provided. Please try again with a valid user!', 422));
   }
    	
   //nota va capito come avviare il primary Mongo con le 2 repliche e settare la password
   try {
	const currSession = await mongoose.startSession();
	currSession.startTransaction();
	await placeToCreate.save({session: currSession});
	await user.places.push(placeToCreate); 
	await user.save({session: currSession});
	await currSession.commitTransaction();
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

    if (placeToUpdate.creator.toString() !== req.userData.userId) {
	return next(new HttpError('You are not allowed to edit the file because you dit not create it!',401));
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
    let placeImage;
    try {
	placeToDelete = await Place.findById(placeId).populate('creator');
	placeImage = placeToDelete.imageUrl;

	if (placeToDelete.creator._id.toString() !== req.userData.userId) {
		throw new Error('You are not allowed to delete the file because you did not create it!, 401');
	}

	const currSession = await mongoose.startSession();
	await currSession.startTransaction();
	await placeToDelete.remove({session: currSession});
	placeToDelete.creator.places.pull(placeToDelete); //grazie al link del populate creator riesco a togliere anche il posto cancellato dalla lista dei posti associati agli utenti
	await placeToDelete.creator.save({session: currSession});
	await currSession.commitTransaction();
    } catch(err) {
	return next(new HttpError(err.message, 500));
    }
    //cancello l'immagine di riferimento
    fs.unlink(placeImage, err => {
	if(err) console.log(err);    
        res.status(200).json({ deletedPlace: placeToDelete, message: `Place with id:${placeId} deleted!` });
    });
}

module.exports = {
    getPlaceByPlaceId,
    getPlacesByUserId,
    createPlace,
    createPlaceNoImage,
    updatePlace,
    deletePlace
}

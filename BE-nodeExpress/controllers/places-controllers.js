const HttpError = require('../models/http-error');

let DUMMY_DATA = [
    {
        id: 'p1',
        title: 'Milan Cathedral',
        description: 'The Milan Cathedral is the cathedral church of Milan, Lombardy, Italy. Dedicated to the Nativity of St Mary (Santa Maria Nascente), it is the seat of the Archbishop of Milan, currently Archbishop Mario Delpini.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Milan_Cathedral_from_Piazza_del_Duomo.jpg/2560px-Milan_Cathedral_from_Piazza_del_Duomo.jpg',
        location: {
            lat: 45.4641,
            lng: 9.1917
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Como Cathedral',
        description: 'The Como Cathedral is is the Catholic cathedral of the city of Como, Lombardy, Italy, and the seat of the Bishop of Como. It is dedicated to the Assumption of the Blessed Virgin Mary.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Como_Dom.jpg',
        location: {
            lat: 45.81176,
            lng: 9.08364
        },
        creator: 'u1'
    }
];

const getPlacesByUserId = (req, res, next) => {
    const { userId } = req.params;
    const places = DUMMY_DATA.filter(placeItem => placeItem.creator === userId);

    if (!places.length) {
        next(new HttpError('Could not find a place for the provided user Id', 404));
        return;
    }

    res.status(200).json({ data: places });
}

const getPlaceByPlaceId = (req, res, next) => {
    const { placeId } = req.params;
    const place = DUMMY_DATA.find(placeItem => placeItem.id === placeId);

    if (!place) {
        next(new HttpError('Could not find a place for the provided Id', 404));
        return;
    }

    res.status(200).json({ data: place });
}

const createPlace = (req, res, next) => {
    const { title, description, creator, imageUrl, coordinates } = req.body;

    const newPlace = {
        id: 'p3',
        title,
        description,
        imageUrl,
        location: coordinates,
        creator,
    }

    DUMMY_DATA.push(newPlace);
    res.status(201).json({ place: newPlace });
}

const updatePlace = (req, res, next) => {
    const { title, description } = req.body;
    const placeId = req.params.placeId;

    const placeToUpdate = { ...DUMMY_DATA.find(p => p.id === placeId) };
    const indexToUpdate = DUMMY_DATA.findIndex(p => p.id === placeId);

    placeToUpdate.title = title;
    placeToUpdate.description = description;

    DUMMY_DATA[indexToUpdate] = placeToUpdate;
    res.status(200).json({ updatedPlace: placeToUpdate });
}

const deletePlace = (req, res, next) => {
    const placeId = req.params.placeId;

    DUMMY_DATA = DUMMY_DATA.filter(p => p.id !== placeId);
    res.status(200).json({ message: 'Place deleted!' });
}

module.exports = {
    getPlaceByPlaceId,
    getPlacesByUserId,
    createPlace,
    updatePlace,
    deletePlace
}
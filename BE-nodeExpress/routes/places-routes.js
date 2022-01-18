const express = require('express');

const routes = express.Router();

const DUMMY_DATA = [
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

routes.get('/user/:userId', (req, res, next) => {
    const { userId } = req.params;
    const places = DUMMY_DATA.filter(placeItem => placeItem.creator === userId);

    if (!places.length) {
        error = new Error('Could not find a place for the provided user Id');
        error.code = 404;
        next(error);
        return;
    }

    res.json({data: places });
})

routes.get('/place/:placeId', (req, res, next) => {
    const { placeId } = req.params;
    const place = DUMMY_DATA.find(placeItem => placeItem.id === placeId);

    if (!place) {
        error = new Error('Could not find a place for the provided Id');
        error.code = 404;
        next(error);
        return;
    }

    res.json({ data: place });
})

module.exports = routes;
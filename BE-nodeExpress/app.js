const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');

const app = express();

app.use('/api/places', placesRoutes);

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }

    const status = error.code || 500;
    const message = error.message || 'An unknown error occured!'
    res.status(status);
    res.json({ message: message });

})

app.listen(4000);
console.log("Server up and running!");
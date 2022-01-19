const express = require('express');
const HttpError = require('./models/http-error');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');

const app = express();

app.use(express.json());

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
    throw new HttpError('Could not find the route specified', 404);
})

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }

    const status = error.code || 500;
    const message = error.message || 'An unknown error occured!'
    res.status(status);
    res.json({ message: message });

})

app.listen(4000, () => {
    console.log("Server up and running!");
});
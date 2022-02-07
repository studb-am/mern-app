const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const HttpError = require('./models/http-error');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const mapRoutes = require('./routes/map-routes');

const app = express();

app.use(express.json());

app.use('/usr/imgs',express.static(path.join(__dirname,'../imgs')));

//Configurazione iniziale che ci permette di lavorare con la CORS policy lato browser
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-Width, content-type, Accept, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
	next();
})


app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/mapToken', mapRoutes);

app.use((req, res, next) => {
    throw new HttpError('Could not find the route specified', 404);
})

app.use((error, req, res, next) => {
    if (req.file) {
	fs.unlink(req.file.path, err => {
		if (err) console.log(err);
	})
    }
    if (res.headerSent) {
        return next(error);
    }

    const status = error.code || 500;
    const message = error.message || 'An unknown error occured!'
    res.status(status);
    res.json({ message: message });

})

mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongodb1:${process.env.MONGO_PORT}/app?authSource=app`)
//mongoose.connect(`mongodb://mongodb1:${process.env.MONGO_PORT}/app`)
	.then(() => {
	  app.listen(4000, () => {
    	    console.log("Server up and running!");
	  })
	})
	.catch(err => {
	  console.log(err.message);
	});
	  

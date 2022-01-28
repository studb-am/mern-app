const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
    let users;	
    try {
	users = await User.find({}, {email: 1, name: 1, places: 1, image: 1});
    } catch (err) {
	return next(new HttpError(err.messge, 500));
    }
    res.status(200).json({users});
}

const signUp = async (req, res, next) => {
    const {name, email, password } = req.body;
    
    //Check 1: verify that the email has never been used
    let exsistingUser;	
    try {
	existingUser = await User.findOne({email: email});
    } catch(err) {
	return next(new HttpError(err.messsage, 500));
    }

    if (existingUser) {
	return next(new HttpError('Mail already used by another user!', 422));
    }

    const  hashedPassword = bcrypt.hashSync(password, 12);
        
    const userToCreate = new User({
	name,
	email,
	password:hashedPassword,
	image: req.file.path,
	places: []
    });

    let token;	
    try {
	token = jwt.sign({
	  userId: userToCreate._id,
	  email: userToCreate.email
	}, 'my_secret_key', { expiresIn: '1h' });
	await userToCreate.save();
    } catch(err) {
	return next(new HttpError(err.message, 422));
    }

    res.status(201).json({ userId: userToCreate._id, email: userToCreate.email, token: token });

}

const login = async (req, res, next) => {
    const {email, password} = req.body;

    let existingUser;
    try {
	existingUser = await User.findOne({email: email});
	
    } catch(err) {
	return next(new HttpError(err.message, 422));
    }

    if(!existingUser || !bcrypt.compareSync(password, existingUser.password)) {
        return next(new HttpError('Login failed! Invalid Credential', 500));
    }
    
    let token;
    try {
       token = jwt.sign({
          userId: existingUser._id,
	  email: existingUser.email
       }, 'my_secret_key', { expiresIn: '1h'  })
    } catch(err) {
	return next(new HttpError(err.message, 422));
    }

    res.status(200).json({userId: existingUser._id, email: existingUser.email, token: token});

}

module.exports = {
    getUsers,
    signUp,
    login
}

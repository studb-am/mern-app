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

    const userToCreate = new User({
	name,
	email,
	password,
	image: req.file.path,
	places: []
    });

    try {
	await userToCreate.save();
    } catch(err) {
	return next(new HttpError(err.message, 422));
    }

    res.status(201).json({ user: userToCreate })

}

const login = async (req, res, next) => {
    const {email, password} = req.body;

    let existingUser;
    try {
	existingUser = await User.findOne({email: email});
    } catch(err) {
	return next(new HttpError(err.message, 422));
    }

    if(!existingUser || existingUser.password !== password) {
        return next(new HttpError('Login failed! Invalid Credential', 500));
    }

    res.status(200).json({user: existingUser});

}

module.exports = {
    getUsers,
    signUp,
    login
}

const HttpError = require('../models/http-error');
const User = require('../models/user');

let DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Manuel',
        email: 'test@test.com',
        password: 'tester'
    }
];

const getUsers = (req, res, next) => {
    res.status(200).json({data: DUMMY_USERS});
}

const signUp = async (req, res, next) => {
    const {name, email, password, image} = req.body;
    
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
	image,
	places: 'p1'
    });

    try {
	await userToCreate.save();
    } catch(err) {
	return next(new HttpError(err.message, 422));
    }

    res.status(201).json({ createdUser: userToCreate })

}

const login = (req, res, next) => {
    const {email, password} = req.body;

    const checkUser = DUMMY_USERS.find(user => user.email === email && user.password === password);
    if(!checkUser) {
        throw new Error('Login failed! Invalid Credential');
    }

    res.status(200).json({message: 'Successfully logged in!'});

}

module.exports = {
    getUsers,
    signUp,
    login
}

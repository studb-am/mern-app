const HttpError = require('../models/http-error');

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

const signUp = (req, res, next) => {
    const {name, email, password} = req.body;
    
    //Check 1: verify that the email has never been used
    const userWithSameEmail = DUMMY_USERS.find(user => user.email === email);
    if(userWithSameEmail) {
        throw new Error('Mail already registered with another user!');
    }

    const createdUser = {
        id: 'u2',
        name,
        email,
        password
    };
    DUMMY_USERS.push(createdUser);

    res.status(201).json({ createdUser })

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
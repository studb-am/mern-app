const validateToken = (req, res, next) => {
    res.status(200).json({ message: 'hello world!'});
}

module.exports = {
    validateToken
}
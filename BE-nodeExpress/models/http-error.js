class HttpError extends Error {
    constructor(message, code) {
        super(message); //by doing this I'm initializing the Error class
        this.code = code; //I'm adding the code in my class initialization
    }
}

module.exports = HttpError;
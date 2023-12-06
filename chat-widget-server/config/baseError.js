class BaseError extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this);
    }
}

module.exports = BaseError;
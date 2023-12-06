const castError = require("mongoose").Error.CastError;

const errorHandler = (error,req,res,next) =>{
    var errStatus = error.statusCode || 500;
    var errMsg = error.message || 'Something went wrong';
    if(error instanceof castError){
        errMsg = "Cannot find the item or invalid id"
    }
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? error.stack : {}
    })
}

module.exports = errorHandler;
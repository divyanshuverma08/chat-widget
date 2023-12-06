const jwt = require("jsonwebtoken");
const TokenExpiredError = jwt.TokenExpiredError;
const JsonWebTokenError = jwt.JsonWebTokenError;
const BaseError = require("../config/baseError");
const httpStatusCodes = require("../config/http");
const environment = require("../utils/environment");

const verifyToken = (req,res,next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        let token, decodedToken;
        if (authorizationHeader) {
          token = authorizationHeader.split(" ")[1];
        }
        if(!token){
            throw new BaseError("Token not provided",httpStatusCodes.unauthorized)
        }
        decodedToken = jwt.verify(token, environment.JWT_SECRET);
        req.user = decodedToken;
        next();
      } catch(err) {
        if(err instanceof TokenExpiredError){
            throw new BaseError("Token expired",httpStatusCodes.unauthorized);
        }else if(err instanceof JsonWebTokenError){
            throw new BaseError("Invalid token",httpStatusCodes.unauthorized);
        }else{
            throw err;
        }
    }
}

module.exports = verifyToken;
const jwt = require("jsonwebtoken");
const environment = require("./environment");

const expiry = "1d"

module.exports.createToken = (payload) => {
    return jwt.sign(payload, environment.JWT_SECRET, { expiresIn: expiry });
}
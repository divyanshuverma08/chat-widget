const BaseError = require("../config/baseError");
const httpStatusCodes = require("../config/http");
const bcrypt = require('bcrypt');
const hostModel = require("../model/hostModel");
const { createToken } = require("../utils/jwt");

module.exports.register = async function(data){
    let oldUser = await hostModel.findOne({email: data.email});

    if(oldUser){
        throw new BaseError("Email Already Exist",httpStatusCodes.conflict);
    }

    let user = new hostModel(data);
    await user.save();
    
    const payload = {id: user._id,email: user.email};

    const token = createToken(payload)

    return {id: user._id,email: user.email,name: user.name,token};
}

module.exports.login = async function(data){
    let user = await hostModel.findOne({email: data.email});

    if(!user){
        throw new BaseError("User not found",httpStatusCodes.notFound);
    }

    let isMatch = false;

    isMatch = await bcrypt.compare(data.password, user.password);

    if(!isMatch) throw new BaseError("Incorrect Password",httpStatusCodes.unauthorized)

    const payload = {id: user._id,email: user.email};

    const token = createToken(payload)

    return {id: user._id,email: user.email,name: user.name,token};
}
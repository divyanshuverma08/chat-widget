const authService = require("../service/authService");
const BaseError = require("../config/baseError");
const httpStatusCodes = require("../config/http");
const { tryCatch } = require("../utils/tryCatch");

module.exports.register = tryCatch(async function (req, res) {
    let data = req.body;
    let name = data.name;
    let email = data.email;
    let password = data.password;
  
    if (!name || !email || !password) {
      throw new BaseError("All fields are mandatory", httpStatusCodes.badRequest);
    }
  
    const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");
  
    if (!emailRegex.test(email)) {
      throw new BaseError(
        "Invalid email address format",
        httpStatusCodes.badRequest
      );
    }
  
    const passwordRegex = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$");
  
    if (!passwordRegex.test(password)) {
      throw new BaseError(
        "Invalid password format (Minimum 6 letters and least one capital letter and one lowercase letter, !, @, #, $, %, ^, &, or * one symbol)",
        httpStatusCodes.badRequest
      );
    }
  
    let user = await authService.register(data);
  
    return res
      .status(httpStatusCodes.ok)
      .send({ success: true, message: "Host created successfully", user });
});

module.exports.login = tryCatch(async function (req, res) {
    let data = req.body;
    let email = data.email;
    let password = data.password;
  
    if (!email || !password) {
      throw new BaseError("All fields are mandatory", httpStatusCodes.badRequest);
    }
  
    const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");
  
    if (!emailRegex.test(email)) {
      throw new BaseError(
        "Invalid email address format",
        httpStatusCodes.badRequest
      );
    }
  
    let user = await authService.login(data);
  
    return res.status(httpStatusCodes.ok).send({ success: true, message: "Login successfull", user });
  
});
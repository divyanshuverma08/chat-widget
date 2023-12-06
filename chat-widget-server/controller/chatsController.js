const chatsService = require("../service/chatsService");
const httpStatusCodes = require("../config/http");
const { tryCatch } = require("../utils/tryCatch");

module.exports.getAllChats = tryCatch(async (req,res) => {

    let response = await chatsService.getAllChats();

    return res
    .status(httpStatusCodes.ok)
    .send({ success: true, message: "Chats", data: response });
    
});

module.exports.getChat = tryCatch(async (req,res) => {
    const id = req.params.id;

    if(!id){
        throw new BaseError("Id not provided in url", httpStatusCodes.badRequest);
    }

    let response = await chatsService.getChat(id);

    return res
    .status(httpStatusCodes.ok)
    .send({ success: true, message: "Chat", data: response });
    
});
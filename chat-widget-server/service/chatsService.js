const chatsModel = require("../model/chatModel");

module.exports.getAllChats = async () => {

    let data = await chatsModel.find().populate("userId").sort({createdAt: -1});
    return data;
}

module.exports.getChat = async (id) => {
    const filter = { _id: id };

    let data = await chatsModel.findOne(filter).populate("userId");
    return data;
}

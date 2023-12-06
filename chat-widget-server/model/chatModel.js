const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema({
    content: String,
    timestamp: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: String,
      enum: ['user', 'host'],
    },
});
  
const chatSchema = new Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    messages: [chatMessageSchema],
},{timestamps:true});

module.exports = mongoose.model("Chat",chatSchema,"Chats");
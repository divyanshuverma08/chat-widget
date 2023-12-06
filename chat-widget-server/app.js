require('dotenv').config();
const express = require("express");
const http = require('http');
const path = require("path");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const errorHandler = require('./middleware/errorHandler');
const environment = require('./utils/environment');
const { Server } = require("socket.io")

//Initializing express app
const app = express();

//cors policy for express
app.use(cors({
    origin: "*"
}));
const server = http.createServer(app);

//cors policy for socket
const io = new Server(server,{cors: {
    origin: '*',
}});

//Allowing public files
app.use(express.static(path.resolve("./public")));

// Environmnt for DB
const config = {
    dburl: `${environment.DB}`
}
try {
    mongoose.connect(config.dburl, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (error) {
    console.log(error);
}

const db = mongoose.connection;

db.on('connected', function () {
    console.log('Mongoose default connection established.');
});

db.on('close', function () {
    console.log('Mongoose connection closed.');
});

// When the connection is disconnected
db.on('disconnected', function () {
    console.log('Mongoose default connection ended.');
});

//parsing incoming body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use(require("./routes"));

const userModel = require("./model/userModel");
const chatModel = require("./model/chatModel");

const connectedHosts = [];

// Socket.io
io.on("connection", (socket) => {

    socket.on('start chat', async (userData) => {
        console.log('User started a chat:', userData);

        try{
        //find user
        let user = await userModel.findOne({email: userData.email});

        //Creating new user
        if(!user){
            console.log("new user");
            user = new userModel({
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
              });

            await user.save();
        }

        //find Chat for the user
        let chat = await chatModel.findOne({userId: user._id});

        if(!chat){
        // Create a new chat instance for the user
        chat = new chatModel({
            userId: user._id,
            messages: [],
        });
        await chat.save();
        }

        // Add the user to their own room
        socket.join(user._id.toString());

        //Notify user that chat is initialized and send chat history
        io.to(socket.id).emit('chat initialized',{userId: user._id, chatId: chat._id, messages: chat.messages});

        //Notify All connected host if a chat is added 
        for(let i = 0; i < connectedHosts.length; i++){
            console.log(connectedHosts[i]);
            io.to(connectedHosts[i]).emit("chat added");
        }

        }catch(error){
            console.log(error);
        }
      
      });

      socket.on('chat message',async (msg) => {
        console.log('Message:', msg);

        try{

            const chatMessage = {
                content: msg.message,
                timestamp: new Date(),
                createdBy: msg.sentBy === "user" ? "user" : "host"
              };
            
              await chatModel.findOneAndUpdate({userId: msg.userId}, { $push: { messages: chatMessage } });
      
              //Notify user and host in a room that a message is added
              io.to(msg.userId.toString()).emit('chat received', {createdBy: msg.sentBy, message: msg.message});

        }catch(error){
            console.log(error);
        }
      
      });

    socket.on('host connect',() => {
        console.log('host connected');
        //Store the currently connected hosts
        connectedHosts.push(socket.id);
    });  

    socket.on('host disconnect', () => {
        console.log('Host disconnected');
        //Remove the disconnected host from connect hosts array
        const index = connectedHosts.indexOf(socket);
        if (index !== -1) {
          connectedHosts.splice(index, 1);
        }
    });

    socket.on('join chat', (hostData) => {
        console.log('Host joined the chat:', hostData);

        try{
            const userId = hostData._id.toString();
      
            //join a room or chat started by user
            socket.join(userId);
        }catch(error){
            console.log(error);
        }
      
    });

    socket.on('leave chat', (hostData) => {
        console.log('Host leave the chat:', hostData);

        try{
            const userId = hostData._id.toString();

            //leave the user room
            socket.leave(userId, function (err) {
                console.log(err);
            });
        }catch(error){
            console.log(error);
        }
      
    });
});

//Global error handler 
app.use(errorHandler);

server.listen(PORT,()=>{
    console.log("Server is listening at PORT - ",PORT);
})

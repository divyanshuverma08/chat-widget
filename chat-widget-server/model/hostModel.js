const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;

const hostSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique: true
    },
    password: {
        type:String,
        required:true
    }
},{timestamps:true});

hostSchema.pre('save', function(next) {
    var user = this;

    bcrypt.hash(user.password,SALT_WORK_FACTOR, function(err, hash) {
        if (err) return next(err);

        // Store hash in your password DB.
        user.password = hash;
        next();
    });
});

module.exports = mongoose.model("Host",hostSchema,"Hosts");
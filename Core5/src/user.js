//Require Dependencies
const mongoose = require('mongoose');

//Define Schema as an Object
const Schema = mongoose.Schema;

//Create the Schema
const UserSchema = new Schema({
    name: String,

});

//Create Model
const User = mongoose.model('user_c', UserSchema);
// 'user' --> collection in DB

//Export Module (the model)
module.exports = User;
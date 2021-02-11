const mongoose = require("mongoose")
const Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email:{
      type: String,
      required: true
    },
    providerId: {
      type: String, 
      default: ''
    },
    provider: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    },
    profilePic: {
      type: String,
      default: 'https://github.com/mirsazzathossain/WebApp/blob/master/assets/images/user.png'
    },
    creationYear:{
      type: String,
      required: true
    },
    role:{
      type: String,
      default: 'user'
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;

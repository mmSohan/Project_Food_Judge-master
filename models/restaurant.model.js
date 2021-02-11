const mongoose = require("mongoose")
const Schema = mongoose.Schema;

var restaurantSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    latitude:{
        type: String,
        required: true
    },
    longitude:{
        type: String,
        required: true
    },
    closingTime:{
        type: String,
        required: true
    },
    openingTime:{
        type: String,
        required: true
    },
    contactNo:{
        type: String,
        required: true
    },
    rating:{
        type: String,
        default: '0'
    },
    photo:{
        type: String,
        required: true
    }

});

const Restaurant = mongoose.model('restaurant', restaurantSchema);

module.exports = Restaurant;
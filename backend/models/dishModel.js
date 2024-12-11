
const mongoose = require('../config/db');

const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image:{
        type:String,
        required:false
    },
    description: {
        type: String,
        required: false
    },
    rating:{
        type:Number,
        required:false
    },
    cookingTime:{
        type:String,
        required:true
    }
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
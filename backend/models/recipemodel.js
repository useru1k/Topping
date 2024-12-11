// models/RecipeModel.js
const mongoose = require('../config/db');

const recipeSchema = new mongoose.Schema({
    dishId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish',
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: {
        type: String,
        required: true
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
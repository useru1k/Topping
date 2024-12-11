
const express = require('express');
const router = express.Router();
const Dish = require('../models/dishModel');
const Recipe = require('../models/recipemodel');


router.get('/dish/all', async (req, res) => {
    try {
        const data = await Dish.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving dishes", error });
    }
});
router.post('/dish/add', async (req, res) => {
    try {
        const newDish = new Dish(req.body);
        const { name } = newDish;
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        const savedData = await newDish.save();
        return res.status(201).json(savedData);
    } catch (error) {
        return res.status(500).json({ message: "Error saving dish", error });
    }
});
router.put('/edit/dish/:id',async(req,res)=>{
    try{
        const {DishID}=new Dish(req.params.id);
        const DishDetails=new Dish(req.body);
        if(!DishID){
            return res.status(400).json({message:"DishId is required"});
        }
       const updateDish=await Dish.findByIdAndUpdate(DishID,DishDetails,{new:true})
       if(!updateDish){
        return res.status(400).json({message:"update dish is not found"});
       }
       return res.status(200).send(updateDish);
    }
    catch(error){
        return res.status(500).json({message:"error in update a dish"});
    }
})
router.get('/get/recipes/:name', async (req, res) => {
    try {
        const dishName = req.params.name;
        const recipe= new Recipe(req.body);
        
        const dish = await Dish.findOne({ name: dishName });
        if (!dish) {
            return res.status(404).json({ message: "Dish not found" });
        }

        const recipes = await Recipe.find({ dishId: dish._id });
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving recipes", error });
    }
});


router.post('/recipes/add/:name', async (req, res) => {
    try {
        const dishName = req.params.name;
        
        const dish = await Dish.findOne({ name: dishName });
        if (!dish) {
            return res.status(404).json({ message: "Dish not found" });
        }

        const newRecipe = new Recipe({
            ...req.body,
            dishId: dish._id 
        });
    
        const savedRecipe = await newRecipe.save();
        return res.status(201).json(savedRecipe);
    } catch (error) {
        return res.status(500).json({ message: "Error saving recipe", error });
    }
});
router.delete('/delete/:name', async (req, res) => {
    try {
        const dishName = req.params.name;
        console.log("Attempting to delete dish:", dishName);
        const deletedDish = await Dish.findOneAndDelete({ name: dishName });
        if (!deletedDish) {
            return res.status(404).json({ message: "Dish not found" });
        }
        await Recipe.deleteMany({ dishId: deletedDish._id });
        return res.status(200).json({ message: "Dish deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting dish", error });
    }
});
router.put('/recipes/edit/:id',async(req,res)=>{
    try{
        const{id}= req.params.id;
        const RecipesDetails=req.body;
        if(!id){
            return res.status(400).json({message:"DishId is required"});
        }
       const updateRecipe=await Recipe.findByIdAndUpdate(id,RecipesDetails,{new:true})
       if(!updateRecipe){
        return res.status(400).json({message:"update Recipes is not found"});
       }
       return res.status(200).send(updateRecipe);
    }
    catch(error){
        
    }
})


module.exports = router;
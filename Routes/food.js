const express = require('express');
const foodControllers = require('../Controllers/food');
const isAuth = require('../middleware/auth');

const router = express.Router();

// Create Food
router.post('/create', isAuth, foodControllers.Addfood);

// Get all food items
router.get('/', foodControllers.getAllFoods);

// Get a food item by ID
router.get('/:id', foodControllers.getFoodById);

// Update a food item by ID
router.put('/update/:id', isAuth, foodControllers.updateFoodById);

// Delete a food item by ID
router.delete('/delete/:id', isAuth, foodControllers.deleteFoodById);


module.exports = router;

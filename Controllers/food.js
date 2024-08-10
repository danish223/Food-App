const Foods = require('../models/food');

// Add a new food item
exports.Addfood = async (req, res, next) => {
    const { title, description, price, imageUrl, foodTags, category, code, isAvailable, resturant, rating, ratingCount } = req.body;
    
    try {
        if (!title || !description || !price || !imageUrl) {
            return res.status(400).send({
                success: false,
                message: "Title, description, price, and image URL are required",
            });
        }

        const newFood = new Foods({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            resturant,
            rating,
            ratingCount
        });

        await newFood.save();

        return res.status(201).send({
            success: true,
            message: 'Food item created successfully',
            newFood
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in creating food item',
            err
        });
    }
};

// Get all food items
exports.getAllFoods = async (req, res, next) => {
    try {
        const foods = await Foods.find();
        if (!foods.length) {
            return res.status(404).send({
                success: false,
                message: 'No food items found',
            });
        }
        return res.status(200).send({
            success: true,
            message: 'Food items fetched successfully',
            foods
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in fetching food items',
            err
        });
    }
};

// Get a food item by ID
exports.getFoodById = async (req, res, next) => {
    const foodId = req.params.id;
    try {
        const food = await Foods.findById(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: 'Food item not found',
            });
        }
        return res.status(200).send({
            success: true,
            message: 'Food item fetched successfully',
            food
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in fetching food item',
            err
        });
    }
};

// Update a food item by ID
exports.updateFoodById = async (req, res, next) => {
    const foodId = req.params.id;
    const { title, description, price, imageUrl, foodTags, category, code, isAvailable, resturant, rating, ratingCount } = req.body;

    try {
        // Await the update operation
        const updatedFood = await Foods.findByIdAndUpdate(
            foodId, 
            { title, description, price, imageUrl, foodTags, category, code, isAvailable, resturant, rating, ratingCount }, 
            { new: true, runValidators: true }
        );

        if (!updatedFood) {
            return res.status(404).send({
                success: false,
                message: 'Food item not found',
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Food item updated successfully',
            food: updatedFood
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in updating food item',
            err
        });
    }
};


// Delete a food item by ID
exports.deleteFoodById = async (req, res, next) => {
    const foodId = req.params.id;

    try {
        const deletedFood = await Foods.findByIdAndDelete(foodId);

        if (!deletedFood) {
            return res.status(404).send({
                success: false,
                message: 'Food item not found',
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Food item deleted successfully',
            food: deletedFood
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in deleting food item',
            err
        });
    }
};

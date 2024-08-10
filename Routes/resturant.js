const express = require('express');
const isAuth = require('../middleware/auth');
const resturantController = require('../Controllers/resturant');

const router = express.Router();


// Create the Resturant 
router.post('/create', isAuth, resturantController.createResturant);

// GET All the Resturant
router.get('/details', isAuth, resturantController.resturantDetails);

// GET Resturant By ID
router.get('/details/:id', isAuth, resturantController.detailsById);

// DELETE Resturant By ID
router.delete('/delete/:id', isAuth, resturantController.resturantDeleteById);

module.exports = router;
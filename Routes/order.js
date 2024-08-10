const express = require('express');
const orderControllers = require('../Controllers/order');
const isAuth = require('../middleware/auth');
const isAdmin = require('../middleware/admin');

const router = express.Router();

// Place Orders
router.post('/add', isAuth, orderControllers.addOrders);

//Order Status
router.post('/status/:id',isAuth, isAdmin, orderControllers.orderStatus);


module.exports = router;
const express = require('express');
const userController = require('../Controllers/user');
const isAuth = require('../middleware/auth');

const router = express.Router();


// GET User User By ID
router.get('/users/:id',isAuth, userController.getUser);

// Update the User By ID
router.put('/edit/:id', isAuth, userController.updateUser);

// Reset Password
router.post('/reset/:id', isAuth, userController.restPassword);

// delete User
router.delete('/delete/:id', isAuth, userController.deleteUser);


module.exports = router;
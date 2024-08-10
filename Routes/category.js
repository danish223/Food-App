const express = require('express');
const CATcontrollers = require('../Controllers/category');
const isAuth = require('../middleware/auth');

const router = express.Router();

// CREATE CAT
router.post('/create', isAuth, CATcontrollers.createCategory);

// GET All CAT
router.get('/details', isAuth, CATcontrollers.getAllCategory);

// Get CAT By ID
router.get('/details/:id', isAuth, CATcontrollers.getCatById);

// Update CAT By ID
router.put('/update/:id', isAuth, CATcontrollers.CatUpdate);

// Delete CAT By ID
router.delete('/delete/:id', isAuth, CATcontrollers.deleteById);

module.exports = router;
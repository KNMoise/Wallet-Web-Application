const express = require('express');
const router = express.Router();

//model Imports
const authController = require('../controllers/authController');


router.post('/register', authController.handleUserRegister);
router.post('/login', authController.handleUserLogin);

module.exports = router;
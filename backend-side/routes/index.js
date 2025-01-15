const express = require('express');
const router = express.Router();

//Controllers Imports
const authController = require('../controllers/authController');
const moneyController = require('../controllers/moneyController')
const acountController = require('../controllers/acountController');



// Create a new account
router.post('/accounts', acountController.create);
// Get all accounts with optional filtering
router.get('/accounts', acountController.getAll);
// Get a single account
router.get('/accounts/:id', acountController.getById);
// Update an account
router.put('/accounts/:id', acountController.update);
// Delete an account
router.delete('/accounts/:id', acountController.delete);
// Update account balance
router.patch('/accounts/:id/balance', acountController.updateBalance);

router.post('/register', authController.handleUserRegister);
router.post('/login', authController.handleUserLogin);

router.post('/moneyIn', moneyController.handleIncome);
router.put('/updateIncome/:id', moneyController.handleUpdateIncome);
router.get('/fetchIncome', moneyController.fetchIncome);
router.delete('/deleteIncome/:id', moneyController.handleDeleteIncome);




module.exports = router;
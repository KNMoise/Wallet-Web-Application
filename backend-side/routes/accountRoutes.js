const express = require('express');
const router = express.Router();
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
router.delete('/account/:id', acountController.delete);
// Update account balance
router.patch('/accounts/:id/balance', acountController.updateBalance);

module.exports = router;
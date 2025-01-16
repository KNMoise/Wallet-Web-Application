const express = require("express");
const router = express.Router();


//Controllers Imports
const authController = require("../controllers/authController");
const acountController = require("../controllers/acountController");
const TransactionController = require("../controllers/TransactionController");
const BudgetController = require("../controllers/BudgetController");
const CategoryController = require("../controllers/CategoryController");
const NotificationController = require("../controllers/NotificationController");



// Transaction routes
router.post('/transactions', TransactionController.createTransaction.bind(TransactionController));
router.get('/accounts/:account_id/transactions', TransactionController.getAccountTransactions);
router.get('/reports/transactions', TransactionController.generateReport);

// Budget routes
router.post('/budgets', BudgetController.createBudget);
router.get('/users/:user_id/budgets', BudgetController.getUserBudgets);

// Category routes
router.post('/categories', CategoryController.createCategory);
router.post('/subcategories', CategoryController.createSubcategory);
router.get('/users/:user_id/categories', CategoryController.getUserCategories);

// Notification routes
router.get('/users/:user_id/notifications', NotificationController.getUnreadNotifications);
router.put('/notifications/:id/read', NotificationController.markAsRead);

// Create a new account
router.post("/accounts", acountController.create);
// Get all accounts with optional filtering
router.get("/accounts", acountController.getAll);
// Get a single account
router.get("/accounts/:id", acountController.getById);
// Update an account
router.put("/accounts/:id", acountController.update);
// Delete an account
router.delete("/accounts/:id", acountController.delete);
// Update account balance
router.patch("/accounts/:id/balance", acountController.updateBalance);

router.post("/register", authController.handleUserRegister);
router.post("/login", authController.handleUserLogin);



module.exports = router;

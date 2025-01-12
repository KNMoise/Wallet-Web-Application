const express = require('express');
const router = express.Router();
// model Imports
const categories = require("../models/category");
const Accounts = require("../models/accounts");
const users = require("../models/users");
const sendubcategories = require("../models/subcategories");
const budgets = require("../models/budgets");


// Public routes
router.get('/', (req, res) => {
    res.send('Hello from transactions route');
    }
);

module.exports = router;
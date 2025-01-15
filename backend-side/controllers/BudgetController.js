const  budgets  = require('../models/budgets');
const categories = require('../models/category');


  // Create a new budget
  const createBudget = async (req, res) => {

    try {
      const { user_id, category_id, amount, currency, period, date_start, end_date } = req.body;
      
      const budget = await budgets.create({
        user_id,
        category_id,
        amount,
        currency,
        period,
        date_start,
        end_date,
        current_spendings: 0
      });
      res.status(201).json({ message: "Budget has Created Successfully", data: budget });

      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Get all budgets for a user
  const getUserBudgets = async (req, res) => {
    try {
      const { user_id } = req.params;
  
      // Ensure budgets and categories models are imported correctly
      const userBudgets = await budgets.findAll({
        where: { user_id },
        include: [{ model: categories }] 
      });
  
      res.status(200).json({ 
        message: "Budgets retrieved successfully", 
        data: userBudgets 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

module.exports = {
  createBudget,
  getUserBudgets
};

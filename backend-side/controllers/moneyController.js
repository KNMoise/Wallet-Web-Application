const users = require("../models/users");
const validator = require("validator");
const MoneyIn  = require("../models/income");

const handleIncome = async (req, res, next) => {
  const { title, in_date, category_id, amount, description } = req.body;
  const income = MoneyIn.build({
    title,
    in_date,
    category_id,
    amount,
    description,
  });
  try {
    if (!title || !in_date || !category_id || !amount || !description) {
      return res.status(400).json({ message: "Please add all fields" });
    }
    if (amount <= 0 || amount === "number") {
      return res.status(400).json({ message: "Amount must be greater than 0" });
    }
    await income.save();
    return res.status(201).json({ message: "Money In created successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const fetchIncome = async (req, res, next) => {
  try {
    const income = await MoneyIn.findAll({
      order: [["in_date", "DESC"]],
    });
    return res.status(200).json({ income });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};
// Update income
const handleUpdateIncome = async (req, res) => {
  const { id } = req.params;  
  const { title, in_date, category_id, amount, description } = req.body;  
  try {
    // Update the income record
    const [updated] = await MoneyIn.update(
      {
        title,
        in_date,
        category_id,
        amount,
        description,
      },
      {
        where: { id },  
      }
    );

    if (updated) {
      return res.status(200).json({ message: "Income updated successfully" });
    }

    return res.status(404).json({ message: "Income not found" });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

const handleDeleteIncome = async (req, res) => {
  const { id } = req.params; 

  try {
    // Use Sequelize's destroy method to delete the record
    const result = await MoneyIn.destroy({ where: { id } });

    if (result) {
      return res.status(200).json({ message: "Income deleted successfully" });
    } else {
      return res.status(404).json({ message: "Income not found" });
    }
  } catch (error) {
    // Return a 500 status code if there is a server error
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  handleIncome,
  fetchIncome,
  handleUpdateIncome,
  handleDeleteIncome,
};

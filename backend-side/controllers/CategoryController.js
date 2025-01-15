const Categories = require("../models/category");
const Subcategories = require("../models/subcategories");

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { user_id, name, type } = req.body;

    const category = await Categories.create({
      user_id,
      name,
      type,
    });
    res.status(201).json({ message: "Category Created Successfully", data: category });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new subcategory
const createSubcategory = async (req, res) => {
  try {
    const { category_id, name, description } = req.body;

    const subcategory = await Subcategories.create({
      category_id,
      name,
      description,
    });
    res.status(201).json({ message: "Subcategories created Successfully", data: subcategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get all categories and subcategories for a user
const getUserCategories = async (req, res) => {
  try {
    const { user_id } = req.params;

    const categories = await Categories.findAll({
      where: { user_id },
      include: [{ model: Subcategories }],
    });
    res.status(201).json({ message: "Retrieve the User Category Successfully", data: categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createCategory,
  createSubcategory,
  getUserCategories,
};

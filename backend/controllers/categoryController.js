const Category = require('../models/Category');
exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};
exports.addCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name required' });
  const cat = await Category.create({ name });
  res.json(cat);
};
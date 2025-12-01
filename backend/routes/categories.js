const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { getCategories, addCategory } = require('../controllers/categoryController');
router.get('/', auth, getCategories);
router.post('/', auth, addCategory);
module.exports = router;
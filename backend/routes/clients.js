const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { getClients, addClient } = require('../controllers/clientController');
router.get('/', auth, getClients);
router.post('/', auth, addClient);
module.exports = router;
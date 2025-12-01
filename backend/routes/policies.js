const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const { getPolicies, addPolicy, updatePolicy, deletePolicy } = require('../controllers/policyController');
router.get('/', auth, getPolicies);
router.post('/', auth, upload.single('attachment'), addPolicy);
router.put('/:id', auth, upload.single('attachment'), updatePolicy);
router.delete('/:id', auth, deletePolicy);
module.exports = router;
const router = require('express').Router();
const { submitEnquiry, getAllEnquiries, updateEnquiry } = require('../controllers/enquiryController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/',     submitEnquiry);
router.get('/',      protect, adminOnly, getAllEnquiries);
router.patch('/:id', protect, adminOnly, updateEnquiry);

module.exports = router;
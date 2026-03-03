const express = require('express');
const router = express.Router();
const { createEnquiry, getMyEnquiries, getEnquiry, updateEnquiry, deleteEnquiry } = require('../controllers/buyerController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');

router.use(protect);
router.use(authorize('buyer', 'admin'));

router.route('/').post(createEnquiry).get(getMyEnquiries);
router.route('/:id').get(getEnquiry).put(updateEnquiry).delete(deleteEnquiry);

module.exports = router;

const express = require('express');
const router = express.Router();
const { createPayment, getMyPayments, getPayment, getAllPayments } = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');

router.use(protect);

router.post('/', authorize('admin'), createPayment);
router.get('/my', getMyPayments);
router.get('/all', authorize('admin'), getAllPayments);
router.get('/:id', getPayment);

module.exports = router;

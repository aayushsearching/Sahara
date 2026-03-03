const express = require('express');
const router = express.Router();
const { createDeal, getDeals, getDeal, updateDeal } = require('../controllers/dealController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');

router.use(protect);

router.route('/').post(authorize('admin'), createDeal).get(authorize('admin'), getDeals);
router.route('/:id').get(getDeal).put(authorize('admin'), updateDeal);

module.exports = router;

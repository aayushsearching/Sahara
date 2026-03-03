const express = require('express');
const router = express.Router();
const { createListing, getMyListings, getListing, updateListing, deleteListing } = require('../controllers/sellerController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');
const upload = require('../middleware/upload');

router.use(protect);
router.use(authorize('seller', 'admin'));

router.route('/').post(upload.array('photos', 10), createListing).get(getMyListings);
router.route('/:id').get(getListing).put(updateListing).delete(deleteListing);

module.exports = router;

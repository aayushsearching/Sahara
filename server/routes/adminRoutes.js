const express = require('express');
const router = express.Router();
const { getStats, getAllUsers, getAllEnquiries, getAllListings, updateUser, deactivateUser } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');

router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.get('/enquiries', getAllEnquiries);
router.get('/listings', getAllListings);
router.route('/user/:id').put(updateUser).delete(deactivateUser);

module.exports = router;

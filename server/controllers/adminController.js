const User = require('../models/User');
const BuyerEnquiry = require('../models/BuyerEnquiry');
const SellerListing = require('../models/SellerListing');
const Deal = require('../models/Deal');
const Payment = require('../models/Payment');

exports.getStats = async (req, res, next) => {
  try {
    const [users, enquiries, listings, deals, payments] = await Promise.all([
      User.countDocuments(),
      BuyerEnquiry.countDocuments(),
      SellerListing.countDocuments(),
      Deal.countDocuments(),
      Payment.aggregate([{ $match: { status: 'completed' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
    ]);
    res.json({
      success: true,
      data: { users, enquiries, listings, deals, revenue: payments[0]?.total || 0 },
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort('-createdAt');
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

exports.getAllEnquiries = async (req, res, next) => {
  try {
    const enquiries = await BuyerEnquiry.find().populate('buyer', 'name email phone').sort('-createdAt');
    res.json({ success: true, data: enquiries });
  } catch (error) {
    next(error);
  }
};

exports.getAllListings = async (req, res, next) => {
  try {
    const listings = await SellerListing.find().populate('seller', 'name email phone').sort('-createdAt');
    res.json({ success: true, data: listings });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { name, email, phone, role, isActive } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, email, phone, role, isActive }, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

exports.deactivateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

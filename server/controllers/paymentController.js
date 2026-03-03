const Payment = require('../models/Payment');

exports.createPayment = async (req, res, next) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    next(error);
  }
};

exports.getMyPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({ paidBy: req.user._id })
      .populate('deal')
      .sort('-createdAt');
    res.json({ success: true, data: payments });
  } catch (error) {
    next(error);
  }
};

exports.getPayment = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('deal').populate('paidBy', 'name email');
    if (!payment) return res.status(404).json({ success: false, message: 'Payment not found' });
    if (payment.paidBy._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    res.json({ success: true, data: payment });
  } catch (error) {
    next(error);
  }
};

exports.getAllPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find()
      .populate('deal')
      .populate('paidBy', 'name email')
      .sort('-createdAt');
    res.json({ success: true, data: payments });
  } catch (error) {
    next(error);
  }
};

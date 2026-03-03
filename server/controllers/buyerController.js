const BuyerEnquiry = require('../models/BuyerEnquiry');

exports.createEnquiry = async (req, res, next) => {
  try {
    const data = { ...req.body, buyer: req.user._id };
    const enquiry = await BuyerEnquiry.create(data);
    res.status(201).json({ success: true, data: enquiry });
  } catch (error) {
    next(error);
  }
};

exports.getMyEnquiries = async (req, res, next) => {
  try {
    const enquiries = await BuyerEnquiry.find({ buyer: req.user._id })
      .populate('matchedDeal')
      .sort('-createdAt');
    res.json({ success: true, data: enquiries });
  } catch (error) {
    next(error);
  }
};

exports.getEnquiry = async (req, res, next) => {
  try {
    const enquiry = await BuyerEnquiry.findById(req.params.id).populate('matchedDeal');
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    if (enquiry.buyer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    res.json({ success: true, data: enquiry });
  } catch (error) {
    next(error);
  }
};

exports.updateEnquiry = async (req, res, next) => {
  try {
    let enquiry = await BuyerEnquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    if (enquiry.buyer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    enquiry = await BuyerEnquiry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, data: enquiry });
  } catch (error) {
    next(error);
  }
};

exports.deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await BuyerEnquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    if (enquiry.buyer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    enquiry.status = 'cancelled';
    await enquiry.save();
    res.json({ success: true, data: enquiry });
  } catch (error) {
    next(error);
  }
};

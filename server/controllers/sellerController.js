const SellerListing = require('../models/SellerListing');

exports.createListing = async (req, res, next) => {
  try {
    const data = { ...req.body, seller: req.user._id };
    // Handle photo uploads — store as base64 data URIs for MVP
    if (req.files && req.files.length > 0) {
      data.photos = req.files.slice(0, 10).map((file) => {
        const b64 = file.buffer.toString('base64');
        return `data:${file.mimetype};base64,${b64}`;
      });
    }
    const listing = await SellerListing.create(data);
    res.status(201).json({ success: true, data: listing });
  } catch (error) {
    next(error);
  }
};

exports.getMyListings = async (req, res, next) => {
  try {
    const listings = await SellerListing.find({ seller: req.user._id })
      .populate('matchedDeal')
      .sort('-createdAt');
    res.json({ success: true, data: listings });
  } catch (error) {
    next(error);
  }
};

exports.getListing = async (req, res, next) => {
  try {
    const listing = await SellerListing.findById(req.params.id).populate('matchedDeal');
    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }
    if (listing.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    res.json({ success: true, data: listing });
  } catch (error) {
    next(error);
  }
};

exports.updateListing = async (req, res, next) => {
  try {
    let listing = await SellerListing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }
    if (listing.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    listing = await SellerListing.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, data: listing });
  } catch (error) {
    next(error);
  }
};

exports.deleteListing = async (req, res, next) => {
  try {
    const listing = await SellerListing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }
    if (listing.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    listing.status = 'delisted';
    await listing.save();
    res.json({ success: true, data: listing });
  } catch (error) {
    next(error);
  }
};

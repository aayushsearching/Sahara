const Deal = require('../models/Deal');
const BuyerEnquiry = require('../models/BuyerEnquiry');
const SellerListing = require('../models/SellerListing');

exports.createDeal = async (req, res, next) => {
  try {
    const { buyerEnquiry, sellerListing, agreedPrice, commissionRate, notes } = req.body;

    const enquiry = await BuyerEnquiry.findById(buyerEnquiry);
    if (!enquiry) return res.status(404).json({ success: false, message: 'Buyer enquiry not found' });

    const listing = await SellerListing.findById(sellerListing);
    if (!listing) return res.status(404).json({ success: false, message: 'Seller listing not found' });

    const commissionAmount = (agreedPrice * commissionRate) / 100;

    const deal = await Deal.create({
      buyerEnquiry,
      sellerListing,
      buyer: enquiry.buyer,
      seller: listing.seller,
      agreedPrice,
      commissionRate,
      commissionAmount,
      notes,
    });

    enquiry.status = 'matched';
    enquiry.matchedDeal = deal._id;
    await enquiry.save();

    listing.status = 'in_negotiation';
    listing.matchedDeal = deal._id;
    await listing.save();

    res.status(201).json({ success: true, data: deal });
  } catch (error) {
    next(error);
  }
};

exports.getDeals = async (req, res, next) => {
  try {
    const deals = await Deal.find()
      .populate('buyer', 'name email phone')
      .populate('seller', 'name email phone')
      .populate('buyerEnquiry')
      .populate('sellerListing')
      .sort('-createdAt');
    res.json({ success: true, data: deals });
  } catch (error) {
    next(error);
  }
};

exports.getDeal = async (req, res, next) => {
  try {
    const deal = await Deal.findById(req.params.id)
      .populate('buyer', 'name email phone')
      .populate('seller', 'name email phone')
      .populate('buyerEnquiry')
      .populate('sellerListing');
    if (!deal) return res.status(404).json({ success: false, message: 'Deal not found' });
    res.json({ success: true, data: deal });
  } catch (error) {
    next(error);
  }
};

exports.updateDeal = async (req, res, next) => {
  try {
    const deal = await Deal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!deal) return res.status(404).json({ success: false, message: 'Deal not found' });

    if (req.body.status === 'closed') {
      await BuyerEnquiry.findByIdAndUpdate(deal.buyerEnquiry, { status: 'deal_closed' });
      await SellerListing.findByIdAndUpdate(deal.sellerListing, { status: 'sold' });
    }
    if (req.body.status === 'cancelled') {
      await BuyerEnquiry.findByIdAndUpdate(deal.buyerEnquiry, { status: 'pending', matchedDeal: null });
      await SellerListing.findByIdAndUpdate(deal.sellerListing, { status: 'active', matchedDeal: null });
    }

    res.json({ success: true, data: deal });
  } catch (error) {
    next(error);
  }
};

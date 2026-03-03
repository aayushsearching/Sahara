const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  buyerEnquiry: { type: mongoose.Schema.Types.ObjectId, ref: 'BuyerEnquiry', required: true },
  sellerListing: { type: mongoose.Schema.Types.ObjectId, ref: 'SellerListing', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  agreedPrice: { type: Number, required: true },
  commissionRate: { type: Number, required: true },
  commissionAmount: { type: Number, required: true },
  status: { type: String, enum: ['initiated', 'negotiation', 'agreement', 'payment_pending', 'closed', 'cancelled'], default: 'initiated' },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Deal', dealSchema);

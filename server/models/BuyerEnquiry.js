const mongoose = require('mongoose');

const buyerEnquirySchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  propertyType: { type: String, enum: ['flat', 'house', 'plot', 'commercial'], required: true },
  desiredArea: { type: Number, required: true },
  areaUnit: { type: String, enum: ['gaj', 'sqft'], default: 'gaj' },
  preferredLocation: { type: String, required: true },
  city: { type: String, required: true },
  budgetMin: { type: Number, required: true },
  budgetMax: { type: Number, required: true },
  notes: { type: String },
  status: { type: String, enum: ['pending', 'in_progress', 'matched', 'deal_closed', 'cancelled'], default: 'pending' },
  matchedDeal: { type: mongoose.Schema.Types.ObjectId, ref: 'Deal' },
}, { timestamps: true });

module.exports = mongoose.model('BuyerEnquiry', buyerEnquirySchema);

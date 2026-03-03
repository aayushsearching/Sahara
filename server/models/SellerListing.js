const mongoose = require('mongoose');

const sellerListingSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  propertyType: { type: String, enum: ['flat', 'house', 'plot', 'commercial'], required: true },
  address: { type: String, required: true },
  locality: { type: String, required: true },
  city: { type: String, required: true },
  pinCode: { type: String, required: true },
  area: { type: Number, required: true },
  areaUnit: { type: String, enum: ['gaj', 'sqft'], default: 'gaj' },
  rooms: { type: Number },
  floors: { type: Number },
  askingPrice: { type: Number, required: true },
  description: { type: String, required: true },
  photos: [{ type: String }],
  furnishing: { type: String, enum: ['furnished', 'semi-furnished', 'unfurnished'], default: 'unfurnished' },
  propertyAge: { type: Number },
  status: { type: String, enum: ['active', 'in_negotiation', 'sold', 'delisted'], default: 'active' },
  matchedDeal: { type: mongoose.Schema.Types.ObjectId, ref: 'Deal' },
}, { timestamps: true });

module.exports = mongoose.model('SellerListing', sellerListingSchema);

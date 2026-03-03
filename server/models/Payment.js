const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  deal: { type: mongoose.Schema.Types.ObjectId, ref: 'Deal', required: true },
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['commission', 'booking', 'advance', 'final'], required: true },
  method: { type: String, enum: ['cash', 'bank_transfer', 'upi', 'cheque'], required: true },
  status: { type: String, enum: ['pending', 'completed', 'refunded'], default: 'pending' },
  receiptNumber: { type: String, unique: true },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

paymentSchema.pre('save', function (next) {
  if (!this.receiptNumber) {
    this.receiptNumber = 'RCP-' + Date.now() + '-' + Math.floor(1000 + Math.random() * 9000);
  }
  next();
});

module.exports = mongoose.model('Payment', paymentSchema);

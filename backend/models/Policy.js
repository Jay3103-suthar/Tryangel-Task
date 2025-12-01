const mongoose = require('mongoose');
const PolicySchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  policyName: { type: String, required: true },
  issueDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  attachmentUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Policy', PolicySchema);
// src/models/package.js
const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  dailyEarningPercentage: Number,
  description: String,
  expiryMonths: Number,
  withdrawalAmount: Number,
});

module.exports = mongoose.model('Package', packageSchema);

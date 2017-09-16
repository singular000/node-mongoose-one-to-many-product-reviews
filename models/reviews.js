const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true},
  content: { type: String, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);

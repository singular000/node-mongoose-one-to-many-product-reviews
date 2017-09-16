const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, unique: true, required: true },
  img: { type: String, default: "https://i.imgur.com/fGi0Yl0.png" },
  price: { type: Number, required: true },
  reviews: []
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

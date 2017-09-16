const express = require('express');
const router = express.Router();

const Product   = require('../models/products');
const Review   = require('../models/reviews');

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product.reviews = await Review.find({ product: product._id });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

router.delete(':/id', async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    await Review.remove({ product: product.id });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;

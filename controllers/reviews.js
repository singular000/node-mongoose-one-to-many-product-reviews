const express = require('express');
const router = express.Router();

const Review    = require('../models/reviews');

router.get('/', async (req, res) => {
  const reviews = await Review.find().populate('product');
  res.status(200).json(reviews);
});

router.post('/', async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(200).json(review);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndRemove(req.params.id);
    res.status(200).json(review);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(review);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;

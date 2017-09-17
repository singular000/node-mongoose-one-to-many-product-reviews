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

router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    await Review.remove({ product: product.id });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

router.get('/seedproducts/seed', async (req, res) => {
  try {
    // all images 150x150
    const products = await Product.create([
        { name: "Car", price: 20000, img: "http://www.gowithgo.net/wp-content/uploads/2011/07/Flintstone_Mobile-150x150.jpg"},
        { name: "Cat", price: 100, img: "http://animagehub.com/wp-content/uploads/2016/10/Pink-panther-vector-5-150x150.jpg"},
        { name: "Crab", price: 2, img: "http://scontent.cdninstagram.com/t51.2885-19/s150x150/13402342_1111471978911960_1380878568_a.jpg"},
        { name: "Crib", price: 200, img: "https://s-media-cache-ak0.pinimg.com/originals/99/29/ee/9929eef9086e07bd7e50102bc37ff3a8.jpg"},
        { name: "Coat", price: 200, img: "https://images.incuboom.com/global/images/products/small/daisy-lucy-navy-gingham-dog-coat--1628.jpg"},
        { name: "Cake", price: 3, img: "http://scontent.cdninstagram.com/t51.2885-19/s150x150/11356601_447610668772561_439752401_a.jpg"},
        { name: "Concussion", price: 0, img: "http://youngmenshealthsite.org/wp-content/uploads/2015/05/concussion1-150x150.jpg"},
        { name: "Coal", price: 1, img: "http://www.whitecatpublications.com/wp-content/uploads/2010/12/lump-of-coal-150x150.jpg"},
        { name: "Cyclone", price: 70000, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cyclone_Mala.JPG/150px-Cyclone_Mala.JPG"},
        { name: "Career", price: 13500, img: "http://waterfordwhispersnews.com/wp-content/uploads/2014/10/happy-worker-e1412334561186-150x150.jpg"},
        { name: "Cillian Murphy", price: 400, img: "http://static.buzznet.com/uploads/2012/03/msg-133176055505-150x150.jpg"},
        { name: "Climate Change", price: 9, img: "http://scitechdaily.com/images/Detailed-Global-Climate-Change-Projections-150x150.jpg" }
    ]);
    res.status(200).json(products);
  } catch (err) {
    console.log(err)
    res.status(400).json({ err: err.message });
  }
}); 
  
module.exports = router;

// DEPENDENCIES
const express    = require('express');
const mongoose   = require('mongoose');
const morgan     = require('morgan');
const bodyParser = require('body-parser');
require('pretty-error').start();

// CONFIG
const app        = express();
const PORT       = process.env.PORT || 3333;
const mongoURI   = process.env.MONGODB_URI || 'mongodb://localhost/products_reviews_app_test'
mongoose.Promise = global.Promise;

// DB
mongoose.connect(mongoURI, { useMongoClient: true }, 
  () => console.log('Mongo running at: ', mongoURI)
);

// CONTROLLERS
const reviewsController = require('./controllers/reviews');
const productsController = require('./controllers/products');

// MIDDLEWARE
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/reviews', reviewsController);
app.use('/products', productsController);

// HOME
app.get('/', (req, res) => res.status(200).json({ message: 'products api demo' }));

// LISTEN
app.listen(PORT, () => console.log('web server running on port: ', PORT));

const mongoose = require('mongoose');

/* Define the product schema */
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String },
  primaryColor: { type: String },
  price: { type: Number, required: true },
  rating: { type: Number },
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
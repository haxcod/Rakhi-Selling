// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  price: {
    type: Number,
    required: true,
  },

  originalPrice: {
    type: Number,
  },

  offer: {
    type: String,
    default: '',
  },

  images: {
    type: [String],
    required: true, // store image URL or base64
  },

  description: {
    type: String,
    default: '',
  },

  features: {
    type: [String], // Array of features
    default: [],
  },

  material: {
    type: String,
    default: '',
  },
  rating: {
    type: Number,
    default:'4.0'
  },
  reviews: {
    type: Number,
    default: 0,
  },

  size: {
    type: String,
    default: '', // e.g. "Small", "Medium", "Large"
  },
  category:{
    type:String,
  },

  stock: {
    type: Number,
    default: 0,
  }

}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

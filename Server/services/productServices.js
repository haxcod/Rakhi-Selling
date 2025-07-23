// routes/products.js
const Product = require('../model/productModal');

// Create a new product
const createProduct = async (data) => {
  try {
    const product = await Product.create(data);
    return product;
  } catch (error) {
    throw error;
  }
};

// Get all products
const getProduct = async () => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return products;
  } catch (error) {
    throw error;
  }
};

const getProductByCategory = async (category) => {
  try {
    const products = await Product.find({ category }).sort({ createdAt: -1 });
    return products;
  } catch (error) {
    throw error;
  }
};

// UPDATE
const updateProduct = async (id, data) => {
  try {
    const product = await Product.findByIdAndUpdate(id, data, {
      new: true, // return updated document
      runValidators: true,
    });
    if (!product) throw new Error('Product not found');
    return product;
  } catch (err) {
    throw err
  }
};

// DELETE
const deleteProduct = async (id) => {
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new Error('Product not found');
    return product;
  } catch (err) {
    throw err;
  }
};


module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductByCategory,
};

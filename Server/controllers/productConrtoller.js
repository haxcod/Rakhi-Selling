const {
  createProduct,
  getProduct,
  getProductByCategory,
  updateProduct,
  deleteProduct,
} = require('../services/productServices');

// CREATE
const productCreate = async (req, res) => {
  try {
    const {
      name,
      price,
      originalPrice,
      offer,
      images,
      description,
      features,
      material,
      size,
      stock,
    } = req.body;

    // Validate required fields
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ success: false, message: 'Product name is required and must be a string.' });
    }

    if (price === undefined || typeof price !== 'number') {
      return res.status(400).json({ success: false, message: 'Price is required and must be a number.' });
    }

    if (!images || !Array.isArray(features)) {
      return res.status(400).json({ success: false, message: 'Image URL is required and must be a string.' });
    }

    // Optional validations
    if (originalPrice && typeof originalPrice !== 'number') {
      return res.status(400).json({ success: false, message: 'Original price must be a number.' });
    }

    if (offer && typeof offer !== 'string') {
      return res.status(400).json({ success: false, message: 'Offer must be a string.' });
    }

    if (description && typeof description !== 'string') {
      return res.status(400).json({ success: false, message: 'Description must be a string.' });
    }

    if (features && !Array.isArray(features)) {
      return res.status(400).json({ success: false, message: 'Features must be an array of strings.' });
    }

    if (material && typeof material !== 'string') {
      return res.status(400).json({ success: false, message: 'Material must be a string.' });
    }

    if (size && typeof size !== 'string') {
      return res.status(400).json({ success: false, message: 'Size must be a string.' });
    }

    if (stock !== undefined && typeof stock !== 'number') {
      return res.status(400).json({ success: false, message: 'Stock must be a number.' });
    }

    // All validations passed, create product
    const product = await createProduct(req.body);
    res.status(201).json({ success: true, product });

  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// READ ALL
const productList = async (req, res) => {
  const category = req.query.category;
  let products;
  try {
    if (category) {
      products = await getProductByCategory(category);
    }
    else {
      products = await getProduct({});
    }

    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


// UPDATE
const productUpdate = async (req, res) => {
  try {
    const updated = await updateProduct(req.params.id, req.body);
    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// DELETE
const productDelete = async (req, res) => {
  try {
    const deleted = await deleteProduct(req.params.id);
    res.json({ success: true, message: 'Product deleted', product: deleted });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  productCreate,
  productList,
  productUpdate,
  productDelete,
};

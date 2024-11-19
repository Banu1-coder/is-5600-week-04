const Products = require('./products');
const path = require('path');

/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
 */
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

/**
 * List all products with pagination and filtering
 * @param {object} req
 * @param {object} res
 */
async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query;

  try {
    const products = await Products.list({
      offset: Number(offset),
      limit: Number(limit),
      tag,
    });

    // Get total count after filtering
    const total = tag
      ? (await Products.list({ tag })).length
      : (await Products.list({})).length;

    res.json({
      products,
      total,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Get a single product
 * @param {object} req
 * @param {object} res
 */
async function getProduct(req, res, next) {
  const { id } = req.params;

  try {
    const product = await Products.get(id);

    if (!product) {
      // If no product found, pass control to the next middleware (e.g., a 404 handler)
      return next();
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  handleRoot,
  listProducts,
  getProduct,
};

const Products = require('./products');
const path = require('path');
const autoCatch = require('./lib/auto-catch'); // Adjust the path if needed


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
  res.json(
    await Products.list({
      offset: Number(offset),
      limit: Number(limit),
      tag,
    })
  );
}

/**
 * Get a single product
 * @param {object} req
 * @param {object} res
 */
async function getProduct(req, res, next) {
  const { id } = req.params;
  const product = await Products.get(id);

  if (!product) {
    return next(); // Pass control to 404 handler
  }

  res.json(product);
}

module.exports = autoCatch{
  handleRoot,
  listProducts,
  getProduct,
};

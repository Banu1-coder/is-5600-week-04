const Products = require('./products');
const path = require('path');
const autoCatch = require('./lib/auto-catch'); // Adjust the path if needed


/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
 */
/**
 * Handle the root route
 */
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

/**
 * List all products
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
 */
async function getProduct(req, res, next) {
  const { id } = req.params;
  const product = await Products.get(id);

  if (!product) {
    return next(); // Pass control to 404 handler
  }

  res.json(product);
}

/**
 * Create a new product
 */
async function createProduct(req, res) {
  console.log('request body:', req.body); // Log the request body
  res.json(req.body); // Echo the request body as the response for testing
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct, // Add the new method here
});

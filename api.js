const Products = require('./products'); // Import Products module
const path = require('path'); // Import path module

/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
 */
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

/**
 * List all products with pagination
 * @param {object} req
 * @param {object} res
 */
async function listProducts(req, res) {
  // Extract the limit and offset query parameters from the request
  const { offset = 0, limit = 25 } = req.query;

  try {
    // Get all products first to count the total
    const allProducts = await Products.list({}); // Get all products without pagination for the total count

    // Pass the limit and offset to the Products service to get the paginated results
    const products = await Products.list({
      offset: Number(offset),
      limit: Number(limit),
    });

    // Send the filtered products and total number of products
    res.json({
      products,
      total: allProducts.length, // Return the total number of products in the database
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  handleRoot,
  listProducts,
};

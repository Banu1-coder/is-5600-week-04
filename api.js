// api.js
const path = require('path');
const Products = require('./products');  // Import the Products service

/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
 */
function handleRoot (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

/**
 * List all products
 * @param {object} req
 * @param {object} res
 */
async function listProducts (req, res) {
  try {
    // Use the Products service to get the list of products
    const products = await Products.list();
    res.json(products);  // Send the products as the response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  handleRoot,
  listProducts
};

const path = require('path');
const fs = require('fs').promises; // Ensure fs is imported here for reading files

/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
 */
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html')); // Serves the HTML file
}

/**
 * List all products
 * @param {object} req
 * @param {object} res
 */
async function listProducts(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Read the products file
  const productsFile = path.join(__dirname, 'data/full-products.json');

  try {
    const data = await fs.readFile(productsFile); // Read the JSON file asynchronously
    res.json(JSON.parse(data)); // Parse and send the JSON response
  } catch (err) {
    res.status(500).json({ error: err.message }); // Send error response
  }
}

module.exports = {
  handleRoot,
  listProducts,
};

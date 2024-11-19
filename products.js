// products.js
const fs = require('fs').promises;
const path = require('path');

const productsFile = path.join(__dirname, 'data/full-products.json');

module.exports = {
  list
};

/**
 * List all products with pagination
 * @param {object} options - Contains limit and offset for pagination
 * @returns {Promise<Array>} - A list of products
 */
async function list(options = {}) {
  const { offset = 0, limit = 25 } = options;
  const data = await fs.readFile(productsFile);

  // Slice the array of products to return only a portion based on offset and limit
  const products = JSON.parse(data);

  return products.slice(offset, offset + limit); // Apply pagination
}

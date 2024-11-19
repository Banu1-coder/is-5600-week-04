const fs = require('fs').promises;
const path = require('path');

const productsFile = path.join(__dirname, 'data', 'products.json');

/**
 * List all products
 * @param {object} options
 * @returns {Promise<Array>}
 */
async function list(options = {}) {
  const { offset = 0, limit = 25, tag } = options;
  const products = JSON.parse(await fs.readFile(productsFile));

  // Filter by tag if a tag is provided
  const filteredProducts = tag
    ? products.filter(product => product.tags?.includes(tag))
    : products;

  // Return paginated and filtered products
  return filteredProducts.slice(offset, offset + limit);
}

/**
 * Get a single product
 * @param {string} id
 * @returns {Promise<object>}
 */
async function get(id) {
  const products = JSON.parse(await fs.readFile(productsFile));

  // Find the product by id
  return products.find(product => product.id === id) || null;
}

/**
 * Delete a product
 * @param {string} id
 * @returns {Promise<void>}
 */
async function remove(id) {
  console.log(`Mock delete: Product with ID ${id} would be deleted`);
  // Placeholder: In a real implementation, you'd remove the product from your data store.
}

/**
 * Update a product
 * @param {string} id
 * @param {object} productData
 * @returns {Promise<void>}
 */
async function update(id, productData) {
  console.log(`Mock update: Product with ID ${id} would be updated with data:`, productData);
  // Placeholder: In a real implementation, you'd modify the product data in your data store.
}

module.exports = {
  list,
  get,
  remove,
  update,
};

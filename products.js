// products.js
const fs = require('fs').promises;
const path = require('path');

const productsFile = path.join(__dirname, 'data/full-products.json');

/**
 * List all products
 * @returns {Promise<Array>} The list of products
 */
async function list () {
  try {
    const data = await fs.readFile(productsFile);
    return JSON.parse(data);
  } catch (error) {
    throw new Error('Error reading products file: ' + error.message);
  }
}

module.exports = {
  list
};

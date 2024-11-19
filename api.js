

/**
 * List all products
 * @param {object} req
 * @param {object} res
 */
async function listProducts(req, res) {
    // Extract the limit and offset query parameters from the request
    const { offset = 0, limit = 25 } = req.query;
  
    try {
      // Pass the limit and offset to the Products service
      const products = await Products.list({
        offset: Number(offset),
        limit: Number(limit)
      });
  
      // Send the filtered products and total number of products
      res.json({
        products,
        total: products.length // Optionally, you can include the total number of products in the response
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  module.exports = {
    handleRoot,
    listProducts
  };
  
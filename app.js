const express = require('express');
const path = require('path');
const api = require('./api'); // Import route handlers from api.js
const middleware = require('./middleware'); 
const bodyParser = require('body-parser');

// Set up the app and port
const app = express();
const port = process.env.PORT || 3000;

// Add middleware
app.use(middleware.cors); // CORS middleware
app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Existing routes
app.get('/', api.handleRoot);
app.get('/products', api.listProducts);
app.get('/products/:id', api.getProduct);

// Error-handling middleware
app.use(middleware.handleError);

// New route for creating a product
app.post('/products', api.createProduct);

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
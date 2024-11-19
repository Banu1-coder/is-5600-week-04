const express = require('express');
const path = require('path');
const api = require('./api'); // Import route handlers from api.js

// Set up the app and port
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the modularized route handlers
app.get('/', api.handleRoot);
app.get('/products', api.listProducts);

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));

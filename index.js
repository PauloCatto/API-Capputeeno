const { products } = require('./db.js');
const express = require('express');
const app = express();

app.get('/products', (req, res) => {
  res.json(products);
});

module.exports = app;
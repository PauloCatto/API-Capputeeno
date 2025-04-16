const express = require('express');
const app = express();
const { products } = require('./db.js');
const port = process.env.PORT || 3333;

app.get('/products', (req, res) => {
  res.json(products);
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});

module.exports = app;

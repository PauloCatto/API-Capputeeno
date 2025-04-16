const { products } = require('./db');

module.exports = (req, res) => {
  res.status(200).json({ products });
};

const express = require('express');
const cors = require('cors');
const { products } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/products', (req, res) => {
  res.status(200).json({ products });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

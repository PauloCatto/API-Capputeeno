const express = require('express');
const cors = require('cors');
const { products } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
}));

app.get('/api/products', (req, res) => {
  res.status(200).json({ products });
});

module.exports = app;

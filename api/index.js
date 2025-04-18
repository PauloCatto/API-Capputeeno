const { products } = require('./db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { query } = req.body;

      if (!query || !query.includes('allProducts')) {
        return res.status(400).json({ error: 'Invalid or missing query.' });
      }

      return res.status(200).json({
        data: {
          allProducts: products,
        },
      });
    } catch (e) {
      return res.status(500).json({ error: 'Error processing GraphQL request.' });
    }
  }

  if (req.method === 'GET') {
    return res.status(200).json({ products });
  }

  return res.status(405).json({ error: 'Method not allowed.' });
};

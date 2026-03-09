const { products } = require("./db");
const axios = require("axios");

const ASAAS_API_KEY = "b9359c9b-b7a0-4621-89e2-bc1291dd6767";

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, access_token");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    try {
      const { query, action, totalValue } = req.body;

      if (action === "PAYMENT_ASAAS") {
        try {
          const customerRes = await axios.post(
            "https://sandbox.asaas.com/api/v3/customers",
            {
              name: "Cliente Capputeeno",
              cpfCnpj: "08874136006",
            },
            {
              headers: {
                access_token: ASAAS_API_KEY,
                "Content-Type": "application/json",
              },
            }
          );
          const customerId = customerRes.data.id;

          const paymentRes = await axios.post(
            "https://sandbox.asaas.com/api/v3/payments",
            {
              customer: customerId,
              billingType: "PIX",
              value: totalValue || 10.0,
              dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
                .toISOString()
                .split("T")[0],
              description: "Compra na loja Capputeeno",
            },
            {
              headers: {
                access_token: ASAAS_API_KEY,
                "Content-Type": "application/json",
              },
            }
          );
          const paymentId = paymentRes.data.id;

          const pixRes = await axios.get(
            `https://sandbox.asaas.com/api/v3/payments/${paymentId}/pixQrCode`,
            {
              headers: {
                access_token: ASAAS_API_KEY,
                "Content-Type": "application/json",
              },
            }
          );

          return res.status(200).json({
            success: true,
            pixData: pixRes.data,
          });
        } catch (asaasError) {
          console.error(
            "Erro no Asaas:",
            asaasError.response ? asaasError.response.data : asaasError.message
          );

          return res.status(200).json({
            success: true,
            pixData: {
              encodedImage: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgMBAFAbozQAAAABJRU5ErkJggg==", // Small pixel
              payload: "00020101021226580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-4266141740005204000053039865802BR5915Mocked Pix User6008BRASILIA62070503***63041234",
              expirationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
            },
            mocked: true
          });
        }
      }

      if (!query || !query.includes("allProducts")) {
        return res.status(400).json({ error: "Invalid or missing query." });
      }

      return res.status(200).json({
        data: {
          allProducts: products,
        },
      });
    } catch (e) {
      return res.status(500).json({ error: "Erro ao processar." });
    }
  }

  if (req.method === "GET") {
    return res.status(200).json({ products });
  }

  return res.status(405).json({ error: "Method not allowed." });
};

import axios from "axios";

export async function fetchProducts() {
  const url = `https://${process.env.SHOPIFY_SHOP}/admin/api/2025-07/products.json`;

  const response = await axios.get(url, {
    headers: {
      "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
      "Content-Type": "application/json",
    },
  });

  return response.data.products;
}

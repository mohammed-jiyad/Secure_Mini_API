
import axios from "axios";

export async function fetchProducts(shop: string, accessToken: string) {
  const url = `https://${shop}/admin/api/2025-01/products.json`;

  const response = await axios.get(url, {
    headers: {
      "X-Shopify-Access-Token": accessToken,
    },
  });

  return response.data.products;
}


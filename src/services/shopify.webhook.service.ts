import axios from "axios";

export async function createWebhook(shop: string, token: string, topic: string, address: string) {
  const url = `https://${shop}/admin/api/2025-01/webhooks.json`;

  const response = await axios.post(
    url,
    {
      webhook: {
        topic,    
        address,  
        format: "json",
      },
    },
    {
      headers: {
        "X-Shopify-Access-Token": token,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.webhook;
}

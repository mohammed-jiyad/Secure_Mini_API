import axios from "axios";

export async function createWebhook(
  shop: string,
  token: string,
  topic: string,
  address: string
) {
  const url = `https://${shop}/admin/api/2025-01/webhooks.json`;

  try {
    
    const existing = await axios.get(url, {
      headers: { "X-Shopify-Access-Token": token },
    });

    const found = existing.data.webhooks.find(
      (w: any) => w.topic === topic && w.address === address
    );

    if (found) {
      console.log(`⚠️ Webhook already exists for ${topic}: ID ${found.id}`);
      return found;
    }

    
    const response = await axios.post(
      url,
      { webhook: { topic, address, format: "json" } },
      {
        headers: {
          "X-Shopify-Access-Token": token,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`✅ Webhook created for ${topic}: ID ${response.data.webhook.id}`);
    return response.data.webhook;
  } catch (err: any) {
    console.error(
      "❌ Webhook creation failed:",
      err.response?.data || err.message
    );
    throw err;
  }
}

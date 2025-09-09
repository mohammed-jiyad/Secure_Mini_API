
import express from "express";
import { exchangeAccessToken } from "../services/shopify.auth.service";
import { fetchProducts } from "../services/shopify.product.service";
import { createWebhook } from "../services/shopify.webhook.service";
const router = express.Router();


router.get("/auth", (req, res) => {
  const { shop } = req.query;

  if (!shop) return res.status(400).send("Missing shop parameter");

  const redirectUri = `${process.env.HOST}/api/v1/auth/callback`;
  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=read_products&redirect_uri=${redirectUri}`;



  res.redirect(installUrl);
});

router.get("/auth/callback", async (req, res) => {
  const { code, shop } = req.query;

  if (!code || !shop) {
    return res.status(400).json({ error: "Missing code or shop" });
  }

  try {
    // 1️⃣ Exchange code → token
    const token = await exchangeAccessToken(code as string, shop as string);

    // 2️⃣ Fetch initial products
    const products = await fetchProducts(shop as string, token);

    // 3️⃣ Register webhooks
    await createWebhook(
      shop as string,
      token,
      "products/create",
      `${process.env.NGROK}/api/v1/webhook/products/create`
    );
    await createWebhook(
      shop as string,
      token,
      "products/update",
      `${process.env.NGROK}/api/v1/webhook/products/update`
    );
    await createWebhook(
      shop as string,
      token,
      "products/delete",
      `${process.env.NGROK}/api/v1/webhook/products/delete`
    );

    res.json({
      success: true,
      shop,
      token,
      products,
      message: "App installed, products fetched",
    });
  } catch (err) {
    res.status(400).json({ error: "Shopify auth failed", details: err });
  }
});



router.get("/products", async (req, res) => {
  const { shop, token } = req.query;

  if (!shop || !token) {
    return res.status(400).json({ error: "Missing shop or token" });
  }

  try {
    const products = await fetchProducts(shop as string, token as string);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products", details: err });
  }
});

export default router;

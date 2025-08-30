import express from "express";
import { exchangeAccessToken } from "../services/shopify.auth.service";
import { fetchProducts } from "../services/shopify.product.service";

const router = express.Router();


router.get("/auth", (req, res) => {
  const { shop } = req.query;

  if (!shop) return res.status(400).send("Missing shop parameter");

  const redirectUri = `${process.env.HOST}/api/v1/auth/callback`;
  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=read_products,write_products&redirect_uri=${redirectUri}`;

  res.redirect(installUrl);
});


router.get("/auth/callback", async (req, res) => {
  const { code, shop } = req.query;

  if (!code || !shop) {
    return res.status(400).json({ error: "Missing code or shop" });
  }

  try {
    const token = await exchangeAccessToken(code as string, shop as string);
    res.json({ success: true, shop, token });
  } catch (err) {
    res.status(400).json({ error: "Shopify auth failed", details: err });
  }
});


router.get("/products", async (_req, res) => {
  try {
    const products = await fetchProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products", details: err });
  }
});

export default router;
